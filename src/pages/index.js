import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Dan Dzoan" />
    <h1>What is this?</h1>
    <p>I don't know yet.</p>
    <p>I don't really blog but I have this domain so I should put something here...</p>
    <Link to={"/shutTheBox"}>
      Play Shut The Box
    </Link>
  </Layout>
);

export default IndexPage
