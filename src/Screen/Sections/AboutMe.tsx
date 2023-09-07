import { Box, Link, Typography } from "@material-ui/core";
import AmazonS3Icon from "Assets/icons/amazonS3";
import ExpressIcon from "Assets/icons/express";
import GraphQLIcon from "Assets/icons/graphql";
import MongoDBIcon from "Assets/icons/mongodb";
import NestJSIcon from "Assets/icons/nestjs";
import ReactIcon from "Assets/icons/react";
import Typescript from "Assets/icons/typescript";
import UbuntuIcon from "Assets/icons/ubuntu";
import React, { FC } from "react";

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = (props) => {
  return (
    <Box px={1}>
      <Typography variant="h2">Who am I?:</Typography>
      <Box p={1}>
        <Typography variant="h2">
          I am a full stack web developer specializing in the MERN stack. I have also worked with{" "}
          <Link href="https://nestjs.com/">
            Nestjs <NestJSIcon size={20} />{" "}
          </Link>
          ,{" "}
          <Link href="https://graphql.org/">
            {" "}
            GraphQL <GraphQLIcon height={20} />{" "}
          </Link>
          ,
          <Link href="https://expressjs.com">
            Express <ExpressIcon size={18} />
          </Link>{" "}
          and{" "}
          <Link href="https://www.mongodb.com/">
            mongoDB <MongoDBIcon size={20} />
          </Link>
          . I daily drive an Ubuntu <UbuntuIcon size={20} /> machine and have on
          occassion written shell scripts and used the aws cli on occassion.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutMe;
