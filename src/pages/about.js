import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutMe = () => (
  <Layout>
    <SEO title="About Me" />
    <h1>About me</h1>
    <p>
      Hey there! My name is Dan and I’m a software engineer. I do lots of things and enjoy participating in random activities. I once held the world record for solving a Rubik’s Cube with one hand. I was playing a lot of ultimate frisbee but currently quarantined and working at Flexport.
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default AboutMe;
