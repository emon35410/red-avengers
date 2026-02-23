import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import StatisticsSection from './Statistics/Statistics';
import Benefits from './Benefits/Benefits';
import HowItWorks from './HowItWorks/HowItWorks';
import FAQ from './FAQ/FAQ';
import EligibilitySection from './Eligibility/EligibilitySection';
import Contact from './Contact/Contact';
import Collaborators from './Collaborators/Collaboratos';
import { Impect } from './Impect/Impect';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
           <StatisticsSection></StatisticsSection>
           <Benefits></Benefits>
           <HowItWorks></HowItWorks>
           <Impect></Impect>
           <EligibilitySection></EligibilitySection>
           <FAQ></FAQ>
           <Contact></Contact>
           <Collaborators></Collaborators>
        </div>
    );
};

export default Home;