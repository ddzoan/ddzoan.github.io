import React from "react"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>What is this?</h1>
    <p>I don't know yet.</p>
    <p>I don't really blog but I have this domain so I should put something here...</p>
    <a href="/shutTheBox">
      Play Shut The Box
    </a>
  </Layout>
);

export default IndexPage
