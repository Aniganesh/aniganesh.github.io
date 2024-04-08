import { Box, Link, Typography } from "@material-ui/core";
import React, { FC } from "react";

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = (props) => {
  return (
    <Box px={1}>
      <Typography variant="h2">
        Hi! I'm your friendly neighborhood full stack developer. I can setup
        your infra with <Link href="https://pulumi.com">Pulumi</Link>, build or upgrade your
        app using{" "}
        <Link href="https://www.oracle.com/in/database/mern-stack/#:~:text=The%20MERN%20stack%20is%20a,role%20in%20the%20development%20process.">
          MERN stack
        </Link>
        , scale down your app to zero using{" "}
        <Link href="https://docs.aws.amazon.com/lambda/">AWS Lambda</Link> and lots of other techy stuff.
      </Typography>
    </Box>
  );
};

export default AboutMe;
