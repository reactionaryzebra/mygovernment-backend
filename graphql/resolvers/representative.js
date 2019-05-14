import Representative from "../types/representative";
import axios from "axios";
require("dotenv").config();

const googleRoot = "https://www.googleapis.com/civicinfo/v2/representatives";
const googleKey = process.env.GOOGLE_KEY;
const propublicaRoot = "https://api.propublica.org/congress/v1";
const propublicaKey = process.env.PRO_PUBLICA_KEY;
const propublicaHeaders = { "X-API-Key": `${propublicaKey}` };
const newsRoot = "https://newsapi.org/v2/everything";
const newsKey = process.env.NEWS_KEY;
const newsHeaders = { "X-API-Key": `${newsKey}` };

const mergeOffice = (officials, offices) => {
  offices.forEach(office => {
    office.officialIndices.forEach(officialIndex => {
      if (officials[officialIndex]) {
        officials[officialIndex].office = office.name;
      }
    });
  });
  return officials;
};

const tagCongress = async officials => {
  try {
    const senateData = await axios.get(
      `${propublicaRoot}/115/senate/members.json`,
      {
        headers: propublicaHeaders
      }
    );
    const houseData = await axios.get(
      `${propublicaRoot}/115/house/members.json`,
      {
        headers: propublicaHeaders
      }
    );
    const senateList = senateData.data.results[0].members;
    const houseList = houseData.data.results[0].members;
    for (const official of officials) {
      if (official.office.includes("United States Senate")) {
        senateList.forEach(senator => {
          if (
            official.name.includes(senator.first_name) &&
            official.name.includes(senator.last_name)
          ) {
            official.proPublicaId = senator.id;
          }
        });
      } else if (official.office.includes("United States House")) {
        houseList.forEach(rep => {
          if (
            official.name.includes(rep.first_name) &&
            official.name.includes(rep.last_name)
          ) {
            official.proPublicaId = rep.id;
          }
        });
      }
    }
    return officials;
  } catch (err) {
    throw new Error(err);
  }
};

const mergeCommittees = async officials => {
  try {
    for (const official of officials) {
      if (official.proPublicaId) {
        const propublicaData = await axios.get(
          `${propublicaRoot}/members/${official.proPublicaId}`,
          { headers: propublicaHeaders }
        );
        official.committees =
          propublicaData.data.results[0].roles[0].committees;
      }
    }
    return officials;
  } catch (err) {
    throw new Error(err);
  }
};

const mergeBills = async officials => {
  try {
    for (const official of officials) {
      if (official.proPublicaId) {
        const propublicaData = await axios.get(
          `${propublicaRoot}/members/${
            official.proPublicaId
          }/bills/cosponsored.json`,
          { headers: propublicaHeaders }
        );
        official.bills = propublicaData.data.results[0].bills;
      }
    }
    return officials;
  } catch (err) {
    throw new Error(err);
  }
};

const mergeNews = async officials => {
  try {
    for (const official of officials) {
      const newsData = await axios.get(
        `${newsRoot}?q=${encodeURI(official.name)}`,
        { headers: newsHeaders }
      );
      official.news = newsData.data.articles;
    }
    return officials;
  } catch (err) {
    throw new Error(err);
  }
};

const makeCleanList = async (officials, offices) => {
  officials = await mergeOffice(officials, offices);
  return officials;
};

const makeCleanRepresentative = async (officials, offices) => {
  officials = await mergeOffice(officials, offices);
  officials = await tagCongress(officials);
  officials = await mergeCommittees(officials);
  officials = await mergeBills(officials);
  return officials;
};

export default {
  Query: {
    representatives: async (root, args) => {
      try {
        const googleData = await axios.get(
          `https://www.googleapis.com/civicinfo/v2/representatives?key=${googleKey}&address=${encodeURI(
            args.address
          )}`
        );
        let officials = googleData.data.officials;
        const offices = googleData.data.offices;
        return makeCleanList(officials, offices);
      } catch (err) {
        throw new Error(err);
      }
    },
    representative: async (root, args) => {
      try {
        const googleData = await axios.get(
          `https://www.googleapis.com/civicinfo/v2/representatives?key=${googleKey}&address=${encodeURI(
            args.address
          )}`
        );
        let official = [
          googleData.data.officials.find(
            official => official.name === args.name
          )
        ];
        official = await makeCleanRepresentative(
          official,
          googleData.data.offices
        );
        return official[0];
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
