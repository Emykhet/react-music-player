import { v4 as uuidv4 } from "uuid";

function musicList() {
  return [
      {
        id: uuidv4(),
        name: "Warm Feeling",
        cover:process.env.REACT_APP_WF_COVER,
        artist: "Xander",
        audio: process.env.REACT_APP_WF_AUDIO,
        active: false,
      },
      {
      id: uuidv4(),
        name: "Going Back",
        cover: process.env.REACT_APP_GB_COVER,
        artist: "Swørn",
        audio: process.env.REACT_APP_GB_AUDIO,
        active: true,
      },
      {
        id: uuidv4(),
        name: "Bliss",
        cover:process.env.REACT_APP_BLISS_COVER,
        artist: "Misha, Jussi Halme",
        audio: process.env.REACT_APP_BLISS_AUDIO,
        active: false,
      },
        {
      id: uuidv4(),
      name: "Ocean Patio",
      cover: process.env.REACT_APP_OP_COVER,
      artist: "Philanthrope, Dayle",
      audio: process.env.REACT_APP_OP_AUDIO,
      active: false,
    },
      {
        id: uuidv4(),
        name: "Slim Bobby",
        cover:process.env.REACT_APP_SB_COVER,
        artist: "Aviino",
        audio: process.env.REACT_APP_SB_AUDIO,
        active: false,
      },
    {
        id: uuidv4(),
        name: "Dancing Droplets",
        cover: process.env.REACT_APP_DD_COVER,
        artist: "Leavv",
        audio: process.env.REACT_APP_DD_AUDIO,
        active: false,
      },
  ];
}

export default musicList;
