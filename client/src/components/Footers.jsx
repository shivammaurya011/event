import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";

function FooterSection({ title, children }) {
  return (
    <div key={title.toLowerCase().replace(" ", "-")} className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
      <div>
        <Footer.Title title={title} />
        {children}
      </div>
    </div>
  );
}

function FooterIconLink({ href, icon: Icon }) {
  return <Footer.Icon href={href} icon={Icon} />;
}

function Footers() {
  return (
    <Footer container className="border border-t-6 border-teal-500">
      <div className="w-full max-w-7xl">
        <div className="w-full grid justify-around sm:flex md:grid-cols-1">
          <div className="mt-4" key="about">
            <Link to={"/"} className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Event</span> Hub
            </Link>
          </div>
          <FooterSection title="About">
            <Footer.LinkGroup col>
              <Footer.Link href="#">Mission</Footer.Link>
              <Footer.Link href="#">Vision</Footer.Link>
              <Footer.Link href="#">Values</Footer.Link>
            </Footer.LinkGroup>
          </FooterSection>
          <FooterSection title="Follow us">
            <Footer.LinkGroup col>
              <Footer.Link href="#">GitHub</Footer.Link>
              <Footer.Link href="#">YouTube</Footer.Link>
              <Footer.Link href="#">LinkedIn</Footer.Link>
            </Footer.LinkGroup>
          </FooterSection>
          <FooterSection title="Legal">
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy</Footer.Link>
              <Footer.Link href="#">Policy</Footer.Link>
              <Footer.Link href="#">Terms & Conditions</Footer.Link>
            </Footer.LinkGroup>
          </FooterSection>
        </div>
        <Footer.Divider />
        <div key="divider" className="flex justify-between px-10">
          <Footer.Copyright href="#" by="EventHub™" year={new Date().getFullYear()} />
          <div className="flex gap-6">
            <FooterIconLink href="#" icon={BsFacebook} />
            <FooterIconLink href="#" icon={BsYoutube} />
            <FooterIconLink href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footers;
