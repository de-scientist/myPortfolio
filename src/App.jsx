import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Mission, Team, Services, Footer, MediaServices } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-center bg-no-repeat bg-cover bg-hero-pattern'>
          <Navbar />
          <Hero />
        </div>
        <Mission />
        <Services />
        <Team />
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <MediaServices />
        <div className='relative z-0'>
          <Contact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
