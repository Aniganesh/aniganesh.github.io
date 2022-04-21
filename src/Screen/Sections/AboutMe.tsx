import { Box, Typography } from "@material-ui/core";
import React, { FC } from "react";

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = (props) => {
  return (
    <Box px={1}>
      <Typography variant="h2">About me:</Typography>
      <Box p={1}>
        <Typography variant="h2">
          This is where I “introduce myself”. I am a full stack web developer
          focusing primarily on the front-end with React and typescript. I have
          also worked with Nestjs, GraphQL, Express and MongoDB. I daily drive
          an Ubuntu machine and have on occassion written shell scripts and used
          the aws cli to interact with S3 buckets.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutMe;
