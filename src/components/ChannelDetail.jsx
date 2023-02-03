import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ChannelCard, Videos } from "./";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannel(data?.items[0]);
    });
    fetchFromAPI(`search?part=snippet&channelId=${id}&order=date`).then(
      (data) => {
        setChannelVideos(data?.items);
      }
    );
  }, [id]);
  return (
    <Box minHeight="87vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(116,9,121,1) 35%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "250px",
          }}
        ></div>
        <ChannelCard channelDetail={channel} marginTop={"-93px"} />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "150px" } }} />
        <Videos videos={channelVideos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
