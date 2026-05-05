export const BASE_URL = "https://cms.must.edu.pk:8082/Chartlet/";

export const SESSIONS = [
  { label: "Fall 2024", value: "FA24" },
  { label: "Spring 2024", value: "SP24" },
  { label: "Fall 2023", value: "FA23" },
  { label: "Spring 2023", value: "SP23" },
  { label: "FA25", value: "FA25" },
  { label: "SP25", value: "SP25" },
  { label: "SP26", value: "SP26" },
  { label: "FA15", value: "FA15" },
  { label: "FA16", value: "FA16" },
  { label: "FA17", value: "FA17" },
  { label: "FA18", value: "FA18" },
  { label: "FA19", value: "FA19" },
  { label: "FA20", value: "FA20" },
  { label: "FA21", value: "FA21" },
  { label: "FA22", value: "FA22" },
  { label: "SP16", value: "SP16" },
  { label: "SP17", value: "SP17" },
  { label: "SP18", value: "SP18" },
  { label: "SP19", value: "SP19" },
  { label: "SP20", value: "SP20" },
  { label: "SP21", value: "SP21" },
  { label: "SP22", value: "SP22" },
  { label: "SU16", value: "SU16" },
  { label: "SU17", value: "SU17" },
  { label: "SU18", value: "SU18" },
  { label: "SU19", value: "SU19" },
  { label: "SU20", value: "SU20" },
  { label: "SU21", value: "SU21" },
  { label: "SU22", value: "SU22" },
  { label: "SU24", value: "SU24" },
  { label: "SU25", value: "SU25" },
  { label: "IN22", value: "IN22" },
  { label: "IN23", value: "IN23" },
  { label: "IN24", value: "IN24" },
  { label: "SE18", value: "SE18" },
  { label: "SE19", value: "SE19" },
  { label: "SE20", value: "SE20" },
  { label: "SE21", value: "SE21" },
  { label: "SE22", value: "SE22" },
  { label: "SE23", value: "SE23" },
  { label: "SE24", value: "SE24" },
  { label: "SE25", value: "SE25" },
].sort((a, b) => b.value.localeCompare(a.value));

export const PROGRAMS = [
  { label: "BS Software Engineering", value: "BSE" },
  { label: "BS Computer Science", value: "BCS" },
  { label: "BS Information Technology", value: "BIT" },
  { label: "BS Artificial Intelligence", value: "BAI" },
  // Scraped programs
  ...["A09", "A10", "A16", "ADE", "B", "B.A", "B01", "B04", "B05", "B06", "B11", "B14", "B2D", "B43", "BAF", "BAH", "BAS", "BAT", "BBA", "BBT", "BCH", "BCM", "BCT", "BCV", "BEC", "BED", "BEE", "BFA", "BFD", "BFT", "BHE", "BHM", "BHN", "BHS", "BIR", "BIS", "BMB", "BMC", "BME", "BMT", "BPH", "BPS", "BSM", "BST", "BSY", "BTH", "BTY", "BZO", "C04", "C05", "C06", "C08", "C11", "CSE", "D02", "D43", "DLA", "DOP", "DPH", "DPT", "DVM", "E01", "E06", "E11", "E14", "E15", "E18", "E24", "E43", "EDE", "EDU", "ELT", "ENG", "EPE", "ETT", "F01", "G10", "G15", "G16", "G17", "G18", "G19", "G20", "G21", "G22", "G23", "G24", "G25", "G26", "G27", "G28", "G30", "G32", "G33", "G35", "G36", "G37", "G38", "G39", "G40", "G41", "G42", "G43", "G44", "G47", "G48", "G49", "G50", "G51", "H01", "H03", "H14", "HRM", "I06", "I11", "I32", "I47", "IET", "IRB", "J05", "J11", "J15", "J16", "J19", "J22", "J24", "J28", "J29", "J30", "J31", "J32", "J35", "J38", "J43", "J47", "J49", "K01", "K15", "L12", "L13", "LAW", "LLB", "M01", "M03", "M05", "M14", "MAE", "MAI", "MBA", "MBE", "MBY", "MCE", "MCH", "MCM", "MCS", "MCT", "MCV", "MEA", "MEC", "MED", "MEE", "MES", "MET", "MLT", "MME", "MMS", "MPE", "MPH", "MSM", "MTE", "MZO", "N01", "N03", "O05", "O06", "O10", "O11", "O14", "O15", "O22", "O24", "O35", "OTT", "P01", "PBT", "PBY", "PCE", "PCH", "PCS", "PCV", "PEE", "PME", "PPH", "PSE", "PSM", "PZO", "Q01", "Q05", "Q18", "R01", "RBA", "RBT", "RBY", "RCE", "RCH", "RCS", "RCV", "REC", "RED", "REE", "REN", "RIS", "RME", "RPH", "RSE", "RSM", "RZO", "S01", "S03", "T01", "T04", "U09", "U10", "U16", "V11", "V12", "V13", "W45", "W46", "X02", "X06", "X12", "Y02", "Y06", "Y09", "Y10", "Y16", "Y24", "Y48", "Z02", "Z06", "Z09", "Z16", "Z24", "Z34", "Z48"]
    .filter(p => !["BSE", "BCS", "BIT", "BAI"].includes(p))
    .map(p => ({ label: p, value: p })),
].sort((a, b) => a.label.localeCompare(b.label));

export const SUFFIXES = [
  { label: "None", value: "" },
  { label: "AJK (Mirpur)", value: "AJK" },
  { label: "BH (Bhimber)", value: "BH" },
  { label: "PL (Pallandri)", value: "PL" },
];

export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.APPWRITE_DATABASE_ID || "",
  collectionId: process.env.APPWRITE_COLLECTION_ID || "",
};
