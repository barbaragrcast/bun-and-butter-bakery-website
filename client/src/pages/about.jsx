import React from "react";

const About = () => {
  return (
    <div id="about">
      <h1>About Our Bakery</h1>
      <h3>
        Welcome to <span className="highlight">Bun & Butter Bakery!</span> 
        We bake fresh bread, cookies, brownies, and pastries every day using 
        simple, quality ingredients. Our goal is to bring a little sweetness 
        and warmth to your day. Stop by for something fresh and delicious.
      </h3>

      {/* Decorative bakery images */}
      <div className="about-images">
        <img 
          src="https://i.pinimg.com/1200x/05/df/a3/05dfa3f60423755f6b2197d32280b78e.jpg" 
          alt="Cookies" 
          className="about-img"
        />
        <img 
          src="https://i.pinimg.com/736x/4f/ea/2b/4fea2b898899fab0284cf00803ac36e1.jpg" 
          alt="Pastries" 
          className="about-img"
        />
        <img 
          src="https://i.pinimg.com/736x/0f/c0/b0/0fc0b05bb2f62ddfef03446d1e225fd6.jpg" 
          alt="Bread" 
          className="about-img"
        />
      </div>
    </div>
  );
};

export default About;