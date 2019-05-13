import Representative from "../types/representative";
import axios from "axios";
require("dotenv").config();

const googleRoot = "https://www.googleapis.com/civicinfo/v2/representatives";
const googleKey = process.env.GOOGLE_KEY;
const propublicaKey = process.env.PRO_PUBLICA_KEY;

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
      "https://api.propublica.org/congress/v1/115/senate/members.json",
      {
        headers: { "X-API-Key": `${propublicaKey}` }
      }
    );
    const houseData = await axios.get(
      "https://api.propublica.org/congress/v1/115/house/members.json",
      {
        headers: { "X-API-Key": `${propublicaKey}` }
      }
    );
    const senateList = senateData.data.results[0].members;
    const houseList = houseData.data.results[0].members;
    officials.forEach(official => {
      if (official.office.includes("United States Senate")) {
        senateList.find(senator => {
          if (
            official.name.includes(senator.first_name) &&
            official.name.includes(senator.last_name)
          ) {
            official.proPublicaId = senator.id;
            console.log(official);
          }
        });
      } else if (official.office.includes("United States House")) {
        houseList.find(rep => {
          if (
            official.name.includes(rep.first_name) &&
            official.name.includes(rep.last_name)
          ) {
            official.proPublicaId = rep.id;
            console.log(official);
          }
        });
      }
    });
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
        const officials = googleData.data.officials;
        const offices = googleData.data.offices;
        mergeOffice(officials, offices);
        tagCongress(officials);
        return officials;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
