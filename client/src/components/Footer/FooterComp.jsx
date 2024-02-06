import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {FaFacebook,FaTwitter,FaYoutube,FaInstagram,FaTiktok} from "react-icons/fa";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-4 border-orange-400 ">
      <div className="w-full w-max-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-lg sm:text-3xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 rounded-lg text-white">
                MERN
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://tr.linkedin.com/in/h-mert-yavas"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Linkedin
                </Footer.Link>
                <Footer.Link
                  href="http://localhost:5173/"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  MernBlog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div className="">
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/HMertYAVAS"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://tr.linkedin.com/in/h-mert-yavas"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" rel="noopener norefferer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" rel="noopener norefferer">
                  Term & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="HMertYAVAS"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center ">
            <Footer.Icon href="#" icon={FaFacebook} />
            <Footer.Icon href="#" icon={FaInstagram} />
            <Footer.Icon href="#" icon={FaTwitter} />
            <Footer.Icon href="#" icon={FaYoutube} />
            <Footer.Icon href="#" icon={FaTiktok} />


          </div>
        </div>
      </div>
    </Footer>
  );
}
