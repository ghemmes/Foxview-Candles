import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
// import bannerImg from '@/images/banner-girl.png';
import bannerImg from '@/images/DSC_1068311.png';
import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';



const Home = () => {
  useDocumentTitle('Foxview Candles | Home');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Soy</strong>
              &nbsp;all natural&nbsp;
              <strong>Candles</strong>
            </h1>
            <p>
            From warm and cozy to fresh and invigorating, we've got the perfect scent to light up your space. 
            Our candles are made with high-quality ingredients and are designed to bring you joy and relaxation. 
            Shop now and experience the clarity that comes with a beautifully scented home.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Candle Highlights</h1>
            {/* <Link to={FEATURED_PRODUCTS}>See All</Link> */}
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Best Sellers </h1>
            {/* <Link to={RECOMMENDED_PRODUCTS}>See All Candles</Link> */}
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="contact-form-container">
          <h1>Contact Us</h1>
            <div className="contact-form-header">            
            
            <ContactForm />
            </div>
          </div>
      </div>


      
    </main>
  );
};

export default Home;
