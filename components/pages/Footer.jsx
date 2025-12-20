import Image from "next/image";
import googlePlay from "../../public/images/google-play.jpg";
import appStore from "../../public/images/app-store.png";
import { Facebook, Twitter, Youtube } from "lucide-react";



export default function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-[11px]">

          <div>
            <h4 className="font-semibold mb-3">Why KAEBAUK Bank</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Our Story</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Benefits & Services</li>
              <li className="hover:text-white cursor-pointer">Rewards</li>
              <li className="hover:text-white cursor-pointer">Entertainment</li>
              <li className="hover:text-white cursor-pointer">Special Offers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Wealth Management</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Private Client</li>
              <li className="hover:text-white cursor-pointer">Citigold®</li>
              <li className="hover:text-white cursor-pointer">Priority Banking</li>
              <li className="hover:text-white cursor-pointer">Private Bank</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Business Banking</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Small Business Accounts</li>
              <li className="hover:text-white cursor-pointer">Commercial Accounts</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Rates</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Personal Banking</li>
              <li className="hover:text-white cursor-pointer">Credit Cards</li>
              <li className="hover:text-white cursor-pointer">Mortgage</li>
              <li className="hover:text-white cursor-pointer">Home Equity</li>
              <li className="hover:text-white cursor-pointer">Personal Loans</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Help & Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Help & FAQs</li>
              <li className="hover:text-white cursor-pointer">Security Center</li>
              <li className="hover:text-white cursor-pointer">
                Civil Relief Act (SCRA)
              </li>
            </ul>
          </div>
        </div>
    
        {/* Social + Need Help */}
        <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-1">
         
   {/* App Store Buttons */}
<div className="flex gap-4 mt-4">
  <Image
    src={googlePlay}
    alt="Google Play"
    className="cursor-pointer"
    width={80}
    height={10}
  />

  <Image
    src={appStore}
    alt="App Store"
    className="cursor-pointer"
    width={130}
    height={40}
  />
</div>

          <div className="flex gap-2">
            <button className="bg-blue-700 text-white text-[10px] px-3 py-2 rounded-md hover:bg-blue-800">
              Need Help?
            </button>
            <button className="bg-gray-600 text-white text-[10px] px-3 py-2 rounded-md hover:bg-gray-500">
              Feedback
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
