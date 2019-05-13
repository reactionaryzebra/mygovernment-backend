import Representative from "../types/representative";
import axios from "axios";
require("dotenv").config();

const googleRoot = "https://www.googleapis.com/civicinfo/v2/representatives";
const googleKey = process.env.GOOGLE_KEY;
const propublicaRoot = "https://api.propublica.org/congress/v1";
const propublicaKey = process.env.PRO_PUBLICA_KEY;
const propublicaHeaders = { "X-API-Key": `${propublicaKey}` };

const mergeOffice = (officials, offices) => {
  offices.forEach(office => {
    office.officialIndices.forEach(officialIndex => {
      officials[officialIndex].office = office.name;
    });
  });
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
    officials = officials.map(official => {
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
      return official;
    });
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
        mergeOffice(officials, offices);
        officials = await tagCongress(officials);
        officials = await mergeCommittees(officials);
        return officials;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
