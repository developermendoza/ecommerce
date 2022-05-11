import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
export default function Home({ products, bannerData }) {
  console.log("test", bannerData);
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = "*[_type=='product']";
  const products = await client.fetch(query);

  const banneQuery = "*[_type=='banner']";
  const bannerData = await client.fetch(banneQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
