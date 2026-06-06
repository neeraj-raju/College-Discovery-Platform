import { PrismaClient, CollegeType } from '@prisma/client';

const prisma = new PrismaClient();

interface SeedCollegeInput {
  name: string;
  city: string;
  state: string;
  location: string;
  type: CollegeType;
  established: number;
  website: string;
}

const governmentColleges: SeedCollegeInput[] = [
  { name: 'IIT Bombay', city: 'Mumbai', state: 'Maharashtra', location: 'Mumbai, Maharashtra', type: CollegeType.GOVERNMENT, established: 1958, website: 'https://www.iitb.ac.in' },
  { name: 'IIT Delhi', city: 'New Delhi', state: 'Delhi', location: 'New Delhi, Delhi', type: CollegeType.GOVERNMENT, established: 1961, website: 'https://www.iitd.ac.in' },
  { name: 'IIT Madras', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.GOVERNMENT, established: 1959, website: 'https://www.iitm.ac.in' },
  { name: 'IIT Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', location: 'Kanpur, Uttar Pradesh', type: CollegeType.GOVERNMENT, established: 1959, website: 'https://www.iitk.ac.in' },
  { name: 'IIT Kharagpur', city: 'Kharagpur', state: 'West Bengal', location: 'Kharagpur, West Bengal', type: CollegeType.GOVERNMENT, established: 1951, website: 'https://www.iitkgp.ac.in' },
  { name: 'IIT Roorkee', city: 'Roorkee', state: 'Uttarakhand', location: 'Roorkee, Uttarakhand', type: CollegeType.GOVERNMENT, established: 1847, website: 'https://www.iitr.ac.in' },
  { name: 'IIT Guwahati', city: 'Guwahati', state: 'Assam', location: 'Guwahati, Assam', type: CollegeType.GOVERNMENT, established: 1994, website: 'https://www.iitg.ac.in' },
  { name: 'IIT Hyderabad', city: 'Hyderabad', state: 'Telangana', location: 'Hyderabad, Telangana', type: CollegeType.GOVERNMENT, established: 2008, website: 'https://www.iith.ac.in' },
  { name: 'IIT BHU', city: 'Varanasi', state: 'Uttar Pradesh', location: 'Varanasi, Uttar Pradesh', type: CollegeType.GOVERNMENT, established: 1919, website: 'https://www.iitbhu.ac.in' },
  { name: 'IIT Indore', city: 'Indore', state: 'Madhya Pradesh', location: 'Indore, Madhya Pradesh', type: CollegeType.GOVERNMENT, established: 2009, website: 'https://www.iiti.ac.in' },
  { name: 'IIT Patna', city: 'Patna', state: 'Bihar', location: 'Patna, Bihar', type: CollegeType.GOVERNMENT, established: 2008, website: 'https://www.iitp.ac.in' },
  { name: 'IIT Gandhinagar', city: 'Gandhinagar', state: 'Gujarat', location: 'Gandhinagar, Gujarat', type: CollegeType.GOVERNMENT, established: 2008, website: 'https://www.iitgn.ac.in' },
  { name: 'IIT Jodhpur', city: 'Jodhpur', state: 'Rajasthan', location: 'Jodhpur, Rajasthan', type: CollegeType.GOVERNMENT, established: 2008, website: 'https://www.iitj.ac.in' },
  { name: 'IIT Ropar', city: 'Rupnagar', state: 'Punjab', location: 'Rupnagar, Punjab', type: CollegeType.GOVERNMENT, established: 2008, website: 'https://www.iitrpr.ac.in' },
  { name: 'IIT Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', location: 'Bhubaneswar, Odisha', type: CollegeType.GOVERNMENT, established: 2008, website: 'https://www.iitbbs.ac.in' },
  { name: 'IIT Mandi', city: 'Mandi', state: 'Himachal Pradesh', location: 'Mandi, Himachal Pradesh', type: CollegeType.GOVERNMENT, established: 2009, website: 'https://www.iitmandi.ac.in' },
  { name: 'IIT Tirupati', city: 'Tirupati', state: 'Andhra Pradesh', location: 'Tirupati, Andhra Pradesh', type: CollegeType.GOVERNMENT, established: 2015, website: 'https://www.iittp.ac.in' },
  { name: 'IIT Dhanbad', city: 'Dhanbad', state: 'Jharkhand', location: 'Dhanbad, Jharkhand', type: CollegeType.GOVERNMENT, established: 1926, website: 'https://www.iitism.ac.in' },
  { name: 'IIT Palakkad', city: 'Palakkad', state: 'Kerala', location: 'Palakkad, Kerala', type: CollegeType.GOVERNMENT, established: 2015, website: 'https://www.iitpkd.ac.in' },
  { name: 'IIT Dharwad', city: 'Dharwad', state: 'Karnataka', location: 'Dharwad, Karnataka', type: CollegeType.GOVERNMENT, established: 2016, website: 'https://www.iitdh.ac.in' },
  { name: 'NIT Trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu', location: 'Tiruchirappalli, Tamil Nadu', type: CollegeType.GOVERNMENT, established: 1964, website: 'https://www.nitt.edu' },
  { name: 'NIT Warangal', city: 'Warangal', state: 'Telangana', location: 'Warangal, Telangana', type: CollegeType.GOVERNMENT, established: 1959, website: 'https://www.nitw.ac.in' },
  { name: 'NIT Surathkal', city: 'Mangalore', state: 'Karnataka', location: 'Mangalore, Karnataka', type: CollegeType.GOVERNMENT, established: 1960, website: 'https://www.nitk.ac.in' },
  { name: 'NIT Calicut', city: 'Kozhikode', state: 'Kerala', location: 'Kozhikode, Kerala', type: CollegeType.GOVERNMENT, established: 1961, website: 'https://www.nitc.ac.in' },
  { name: 'NIT Rourkela', city: 'Rourkela', state: 'Odisha', location: 'Rourkela, Odisha', type: CollegeType.GOVERNMENT, established: 1961, website: 'https://www.nitrkl.ac.in' },
  { name: 'NIT Allahabad', city: 'Prayagraj', state: 'Uttar Pradesh', location: 'Prayagraj, Uttar Pradesh', type: CollegeType.GOVERNMENT, established: 1961, website: 'https://www.mnnit.ac.in' },
  { name: 'NIT Durgapur', city: 'Durgapur', state: 'West Bengal', location: 'Durgapur, West Bengal', type: CollegeType.GOVERNMENT, established: 1960, website: 'https://www.nitdgp.ac.in' },
  { name: 'NIT Jaipur', city: 'Jaipur', state: 'Rajasthan', location: 'Jaipur, Rajasthan', type: CollegeType.GOVERNMENT, established: 1963, website: 'https://www.mnit.ac.in' },
  { name: 'NIT Kurukshetra', city: 'Kurukshetra', state: 'Haryana', location: 'Kurukshetra, Haryana', type: CollegeType.GOVERNMENT, established: 1963, website: 'https://www.nitkkr.ac.in' },
  { name: 'NIT Nagpur', city: 'Nagpur', state: 'Maharashtra', location: 'Nagpur, Maharashtra', type: CollegeType.GOVERNMENT, established: 1960, website: 'https://www.vnit.ac.in' },
  { name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal', location: 'Kolkata, West Bengal', type: CollegeType.GOVERNMENT, established: 1955, website: 'http://www.jaduniv.edu.in' },
  { name: 'Delhi Technological University', city: 'New Delhi', state: 'Delhi', location: 'New Delhi, Delhi', type: CollegeType.GOVERNMENT, established: 1941, website: 'https://www.dtu.ac.in' },
  { name: 'Anna University', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.GOVERNMENT, established: 1978, website: 'https://www.annauniv.edu' },
  { name: 'Jawaharlal Nehru University', city: 'New Delhi', state: 'Delhi', location: 'New Delhi, Delhi', type: CollegeType.GOVERNMENT, established: 1969, website: 'https://www.jnu.ac.in' },
  { name: 'University of Hyderabad', city: 'Hyderabad', state: 'Telangana', location: 'Hyderabad, Telangana', type: CollegeType.GOVERNMENT, established: 1974, website: 'https://uohyd.ac.in' },
  { name: 'IISc Bangalore', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.GOVERNMENT, established: 1909, website: 'https://www.iisc.ac.in' },
  { name: 'IIIT Hyderabad', city: 'Hyderabad', state: 'Telangana', location: 'Hyderabad, Telangana', type: CollegeType.GOVERNMENT, established: 1998, website: 'https://www.iiit.ac.in' },
  { name: 'College of Engineering Pune', city: 'Pune', state: 'Maharashtra', location: 'Pune, Maharashtra', type: CollegeType.GOVERNMENT, established: 1854, website: 'https://www.coep.org.in' },
  { name: 'Jamia Millia Islamia', city: 'New Delhi', state: 'Delhi', location: 'New Delhi, Delhi', type: CollegeType.GOVERNMENT, established: 1920, website: 'https://www.jmi.ac.in' },
  { name: 'Aligarh Muslim University', city: 'Aligarh', state: 'Uttar Pradesh', location: 'Aligarh, Uttar Pradesh', type: CollegeType.GOVERNMENT, established: 1920, website: 'https://www.amu.ac.in' },
];

const privateColleges: SeedCollegeInput[] = [
  { name: 'VIT Vellore', city: 'Vellore', state: 'Tamil Nadu', location: 'Vellore, Tamil Nadu', type: CollegeType.PRIVATE, established: 1984, website: 'https://vit.ac.in' },
  { name: 'SRM Institute', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.PRIVATE, established: 1985, website: 'https://www.srmist.edu.in' },
  { name: 'Manipal Institute of Technology', city: 'Manipal', state: 'Karnataka', location: 'Manipal, Karnataka', type: CollegeType.PRIVATE, established: 1957, website: 'https://manipal.edu' },
  { name: 'Amity University', city: 'Noida', state: 'Uttar Pradesh', location: 'Noida, Uttar Pradesh', type: CollegeType.PRIVATE, established: 2005, website: 'https://www.amity.edu' },
  { name: 'Lovely Professional University', city: 'Phagwara', state: 'Punjab', location: 'Phagwara, Punjab', type: CollegeType.PRIVATE, established: 2005, website: 'https://www.lpu.in' },
  { name: 'Shiv Nadar University', city: 'Greater Noida', state: 'Uttar Pradesh', location: 'Greater Noida, Uttar Pradesh', type: CollegeType.PRIVATE, established: 2011, website: 'https://snu.edu.in' },
  { name: 'Ashoka University', city: 'Sonipat', state: 'Haryana', location: 'Sonipat, Haryana', type: CollegeType.PRIVATE, established: 2014, website: 'https://www.ashoka.edu.in' },
  { name: 'Kalinga Institute', city: 'Bhubaneswar', state: 'Odisha', location: 'Bhubaneswar, Odisha', type: CollegeType.PRIVATE, established: 1992, website: 'https://kiit.ac.in' },
  { name: 'Thapar Institute', city: 'Patiala', state: 'Punjab', location: 'Patiala, Punjab', type: CollegeType.PRIVATE, established: 1956, website: 'https://www.thapar.edu' },
  { name: 'PES University', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1972, website: 'https://pes.edu' },
  { name: 'Christ University', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1969, website: 'https://christuniversity.in' },
  { name: 'Chandigarh University', city: 'Mohali', state: 'Punjab', location: 'Mohali, Punjab', type: CollegeType.PRIVATE, established: 2012, website: 'https://www.cuchd.in' },
  { name: 'Chitkara University', city: 'Rajpura', state: 'Punjab', location: 'Rajpura, Punjab', type: CollegeType.PRIVATE, established: 2010, website: 'https://www.chitkara.edu.in' },
  { name: 'Bennett University', city: 'Greater Noida', state: 'Uttar Pradesh', location: 'Greater Noida, Uttar Pradesh', type: CollegeType.PRIVATE, established: 2016, website: 'https://www.bennett.edu.in' },
  { name: 'Presidency University', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 2013, website: 'https://presidencyuniversity.in' },
  { name: 'Woxsen University', city: 'Hyderabad', state: 'Telangana', location: 'Hyderabad, Telangana', type: CollegeType.PRIVATE, established: 2014, website: 'https://woxsen.edu.in' },
  { name: 'Nirma University', city: 'Ahmedabad', state: 'Gujarat', location: 'Ahmedabad, Gujarat', type: CollegeType.PRIVATE, established: 2003, website: 'https://nirmauni.ac.in' },
  { name: 'DSCE Bangalore', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1979, website: 'https://dayanandasagar.edu' },
  { name: 'BMS College of Engineering', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1946, website: 'https://bmsce.ac.in' },
  { name: 'RV College of Engineering', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1963, website: 'https://rvce.edu.in' },
  { name: 'SSN College of Engineering', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.PRIVATE, established: 1996, website: 'https://www.ssn.edu.in' },
  { name: 'PSG College of Technology', city: 'Coimbatore', state: 'Tamil Nadu', location: 'Coimbatore, Tamil Nadu', type: CollegeType.PRIVATE, established: 1951, website: 'https://www.psgtech.edu' },
  { name: 'Sathyabama Institute', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.PRIVATE, established: 1987, website: 'https://www.sathyabama.ac.in' },
  { name: 'Saveetha University', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.PRIVATE, established: 2005, website: 'https://saveetha.com' },
  { name: 'KLE Technological University', city: 'Hubballi', state: 'Karnataka', location: 'Hubballi, Karnataka', type: CollegeType.PRIVATE, established: 1947, website: 'https://www.kletech.ac.in' },
  { name: 'MS Ramaiah Institute', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1962, website: 'https://www.msrit.edu' },
  { name: 'JSS Science and Technology', city: 'Mysuru', state: 'Karnataka', location: 'Mysuru, Karnataka', type: CollegeType.PRIVATE, established: 1963, website: 'https://jssstuniv.in' },
  { name: 'New Horizon College', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.PRIVATE, established: 1970, website: 'https://newhorizonindia.edu' },
  { name: 'MIT WPU Pune', city: 'Pune', state: 'Maharashtra', location: 'Pune, Maharashtra', type: CollegeType.PRIVATE, established: 1983, website: 'https://mitwpu.edu.in' },
  { name: 'Symbiosis Institute of Technology', city: 'Pune', state: 'Maharashtra', location: 'Pune, Maharashtra', type: CollegeType.PRIVATE, established: 2008, website: 'https://www.sitpune.edu.in' },
  { name: 'Amrita Vishwa Vidyapeetham', city: 'Coimbatore', state: 'Tamil Nadu', location: 'Coimbatore, Tamil Nadu', type: CollegeType.PRIVATE, established: 2003, website: 'https://www.amrita.edu' },
  { name: 'Sastra University', city: 'Thanjavur', state: 'Tamil Nadu', location: 'Thanjavur, Tamil Nadu', type: CollegeType.PRIVATE, established: 1984, website: 'https://www.sastra.edu' },
  { name: 'Karunya Institute', city: 'Coimbatore', state: 'Tamil Nadu', location: 'Coimbatore, Tamil Nadu', type: CollegeType.PRIVATE, established: 1986, website: 'https://www.karunya.edu' },
  { name: 'Hindustan Institute', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.PRIVATE, established: 1985, website: 'https://hindustanuniv.ac.in' },
  { name: 'GITAM University', city: 'Visakhapatnam', state: 'Andhra Pradesh', location: 'Visakhapatnam, Andhra Pradesh', type: CollegeType.PRIVATE, established: 1980, website: 'https://www.gitam.edu' },
  { name: 'KL University', city: 'Guntur', state: 'Andhra Pradesh', location: 'Guntur, Andhra Pradesh', type: CollegeType.PRIVATE, established: 1980, website: 'https://www.kluniversity.in' },
  { name: 'Mahindra University', city: 'Hyderabad', state: 'Telangana', location: 'Hyderabad, Telangana', type: CollegeType.PRIVATE, established: 2020, website: 'https://www.mahindrauniversity.edu.in' },
  { name: 'Plaksha University', city: 'Mohali', state: 'Punjab', location: 'Mohali, Punjab', type: CollegeType.PRIVATE, established: 2021, website: 'https://plaksha.edu.in' },
  { name: 'FLAME University', city: 'Pune', state: 'Maharashtra', location: 'Pune, Maharashtra', type: CollegeType.PRIVATE, established: 2015, website: 'https://www.flame.edu.in' },
  { name: 'OP Jindal Global University', city: 'Sonipat', state: 'Haryana', location: 'Sonipat, Haryana', type: CollegeType.PRIVATE, established: 2009, website: 'https://jgu.edu.in' },
];

const deemedColleges: SeedCollegeInput[] = [
  { name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan', location: 'Pilani, Rajasthan', type: CollegeType.DEEMED, established: 1964, website: 'https://www.bits-pilani.ac.in' },
  { name: 'BITS Goa', city: 'Zuarinagar', state: 'Goa', location: 'Zuarinagar, Goa', type: CollegeType.DEEMED, established: 2004, website: 'https://www.bits-pilani.ac.in/goa' },
  { name: 'BITS Hyderabad', city: 'Hyderabad', state: 'Telangana', location: 'Hyderabad, Telangana', type: CollegeType.DEEMED, established: 2008, website: 'https://www.bits-pilani.ac.in/hyderabad' },
  { name: 'Jamia Hamdard', city: 'New Delhi', state: 'Delhi', location: 'New Delhi, Delhi', type: CollegeType.DEEMED, established: 1989, website: 'http://jamiahamdard.edu' },
  { name: 'Symbiosis International', city: 'Pune', state: 'Maharashtra', location: 'Pune, Maharashtra', type: CollegeType.DEEMED, established: 2002, website: 'https://www.siu.edu.in' },
  { name: 'VIT AP', city: 'Amaravati', state: 'Andhra Pradesh', location: 'Amaravati, Andhra Pradesh', type: CollegeType.DEEMED, established: 2017, website: 'https://vitap.ac.in' },
  { name: 'SRM AP', city: 'Amaravati', state: 'Andhra Pradesh', location: 'Amaravati, Andhra Pradesh', type: CollegeType.DEEMED, established: 2017, website: 'https://srmap.edu.in' },
  { name: 'IIIT Bangalore', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.DEEMED, established: 1999, website: 'https://www.iiitb.ac.in' },
  { name: 'DA-IICT', city: 'Gandhinagar', state: 'Gujarat', location: 'Gandhinagar, Gujarat', type: CollegeType.DEEMED, established: 2001, website: 'https://www.daiict.ac.in' },
  { name: 'IIIT Delhi', city: 'New Delhi', state: 'Delhi', location: 'New Delhi, Delhi', type: CollegeType.DEEMED, established: 2008, website: 'https://www.iiitd.ac.in' },
  { name: 'Dhirubhai Ambani Institute', city: 'Gandhinagar', state: 'Gujarat', location: 'Gandhinagar, Gujarat', type: CollegeType.DEEMED, established: 2001, website: 'https://www.daiict.ac.in' },
  { name: 'ICT Mumbai', city: 'Mumbai', state: 'Maharashtra', location: 'Mumbai, Maharashtra', type: CollegeType.DEEMED, established: 1933, website: 'https://www.ictmumbai.edu.in' },
  { name: 'NITTE Meenakshi Institute', city: 'Bangalore', state: 'Karnataka', location: 'Bangalore, Karnataka', type: CollegeType.DEEMED, established: 1986, website: 'https://nmit.ac.in' },
  { name: 'Sri Ramachandra Institute', city: 'Chennai', state: 'Tamil Nadu', location: 'Chennai, Tamil Nadu', type: CollegeType.DEEMED, established: 1985, website: 'https://www.sriramachandra.edu.in' },
  { name: 'Banasthali Vidyapith', city: 'Banasthali', state: 'Rajasthan', location: 'Banasthali, Rajasthan', type: CollegeType.DEEMED, established: 1935, website: 'http://www.banasthali.org' },
  { name: 'Shanmugha Arts Science', city: 'Thanjavur', state: 'Tamil Nadu', location: 'Thanjavur, Tamil Nadu', type: CollegeType.DEEMED, established: 1984, website: 'https://www.sastra.edu' },
  { name: 'Koneru Lakshmaiah Education', city: 'Guntur', state: 'Andhra Pradesh', location: 'Guntur, Andhra Pradesh', type: CollegeType.DEEMED, established: 1980, website: 'https://www.kluniversity.in' },
  { name: 'Vignan University', city: 'Guntur', state: 'Andhra Pradesh', location: 'Guntur, Andhra Pradesh', type: CollegeType.DEEMED, established: 1997, website: 'https://vignan.ac.in' },
  { name: 'Graphic Era University', city: 'Dehradun', state: 'Uttarakhand', location: 'Dehradun, Uttarakhand', type: CollegeType.DEEMED, established: 1993, website: 'https://www.geu.ac.in' },
  { name: 'DIT University', city: 'Dehradun', state: 'Uttarakhand', location: 'Dehradun, Uttarakhand', type: CollegeType.DEEMED, established: 1998, website: 'https://www.dituniversity.edu.in' },
];

const allCollegesInput = [...governmentColleges, ...privateColleges, ...deemedColleges];

async function main() {
  console.log('Clearing database tables...');
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log(`Seeding ${allCollegesInput.length} colleges...`);

  for (let i = 0; i < allCollegesInput.length; i++) {
    const input = allCollegesInput[i];
    
    // Determine rating based on type and status
    let rating = 3.5;
    if (input.type === CollegeType.GOVERNMENT) {
      if (input.name.startsWith('IIT')) {
        rating = Math.round((4.4 + Math.random() * 0.5) * 10) / 10; // 4.4 - 4.9
      } else if (input.name.startsWith('NIT')) {
        rating = Math.round((3.9 + Math.random() * 0.5) * 10) / 10; // 3.9 - 4.4
      } else {
        rating = Math.round((3.6 + Math.random() * 0.6) * 10) / 10; // 3.6 - 4.2
      }
    } else if (input.type === CollegeType.PRIVATE) {
      if (['VIT Vellore', 'Manipal Institute of Technology', 'Thapar Institute', 'RV College of Engineering'].includes(input.name)) {
        rating = Math.round((4.1 + Math.random() * 0.4) * 10) / 10; // 4.1 - 4.5
      } else {
        rating = Math.round((3.0 + Math.random() * 0.9) * 10) / 10; // 3.0 - 3.9
      }
    } else { // DEEMED
      if (input.name.startsWith('BITS')) {
        rating = Math.round((4.4 + Math.random() * 0.4) * 10) / 10; // 4.4 - 4.8
      } else {
        rating = Math.round((3.6 + Math.random() * 0.8) * 10) / 10; // 3.6 - 4.4
      }
    }

    // Determine fees range in INR
    let baseFees = 150000;
    if (input.type === CollegeType.GOVERNMENT) {
      baseFees = Math.floor(100000 + Math.random() * 200000); // 1L - 3L
    } else if (input.type === CollegeType.PRIVATE) {
      baseFees = Math.floor(200000 + Math.random() * 600000); // 2L - 8L
    } else { // DEEMED
      baseFees = Math.floor(150000 + Math.random() * 450000); // 1.5L - 6L
    }

    const totalReviews = Math.floor(20 + Math.random() * 250);
    const overview = `${input.name} is a premier educational institution located in ${input.city}, ${input.state}. Established in ${input.established}, it has a rich history of academic excellence and is widely recognized for its state-of-the-art facilities, distinguished faculty, and outstanding placement opportunities. The campus offers a vibrant and nurturing environment for student development.`;

    const imageIndex = (i % 5) + 1;
    // Mock image URLs representing campus libraries/buildings
    const imageUrl = `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop`;

    const created = await prisma.college.create({
      data: {
        name: input.name,
        city: input.city,
        state: input.state,
        location: input.location,
        type: input.type,
        fees: baseFees,
        rating: rating,
        totalReviews: totalReviews,
        overview: overview,
        established: input.established,
        website: input.website,
        imageUrl: imageUrl,
        courses: {
          create: [
            { name: 'B.Tech Computer Science & Engineering', duration: 4, fees: baseFees, seats: 120, exam: 'JEE Main', cutoff: input.name.startsWith('IIT') ? Math.floor(800 + Math.random() * 1200) : input.name.startsWith('NIT') ? Math.floor(4000 + Math.random() * 6000) : Math.floor(15000 + Math.random() * 30000) },
            { name: 'B.Tech Electronics & Communication Engineering', duration: 4, fees: Math.floor(baseFees * 0.9), seats: 90, exam: 'JEE Main', cutoff: input.name.startsWith('IIT') ? Math.floor(2000 + Math.random() * 2000) : input.name.startsWith('NIT') ? Math.floor(8000 + Math.random() * 8000) : Math.floor(25000 + Math.random() * 40000) },
            { name: 'B.Tech Mechanical Engineering', duration: 4, fees: Math.floor(baseFees * 0.8), seats: 60, exam: 'JEE Main', cutoff: input.name.startsWith('IIT') ? Math.floor(4000 + Math.random() * 4000) : input.name.startsWith('NIT') ? Math.floor(15000 + Math.random() * 15000) : Math.floor(40000 + Math.random() * 60000) },
            { name: 'M.Tech Computer Science', duration: 2, fees: Math.floor(baseFees * 0.75), seats: 30, exam: 'GATE', cutoff: Math.floor(400 + Math.random() * 400) },
            { name: 'Master of Business Administration (MBA)', duration: 2, fees: Math.floor(baseFees * 1.1), seats: 60, exam: 'CAT', cutoff: Math.floor(80 + Math.random() * 18) },
          ],
        },
        placements: {
          create: [
            {
              year: 2024,
              avgPackage: Math.round((rating * 3.5 + Math.random() * 3) * 10) / 10,
              highestPackage: Math.round((rating * 12 + Math.random() * 30) * 10) / 10,
              placementRate: Math.round((75 + rating * 4 + Math.random() * 5) * 10) / 10,
              topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'TCS', 'Infosys'],
            },
            {
              year: 2023,
              avgPackage: Math.round((rating * 3.2 + Math.random() * 2.5) * 10) / 10,
              highestPackage: Math.round((rating * 11 + Math.random() * 25) * 10) / 10,
              placementRate: Math.round((73 + rating * 4 + Math.random() * 5) * 10) / 10,
              topRecruiters: ['Microsoft', 'Amazon', 'Adobe', 'Wipro', 'Cognizant', 'L&T'],
            },
          ],
        },
        reviews: {
          create: [
            {
              rating: Math.ceil(rating),
              title: 'Excellent Academic Culture and Great Placement Opportunities',
              body: `The curriculum is highly relevant and updated frequently. Faculty members are extremely helpful and guide you in research and industry projects. Placement cell works tirelessly, and almost all top recruiters visit the campus. Campus life is lively with various fests and club activities.`,
              author: 'Siddharth Sharma',
              batch: 2024,
            },
            {
              rating: Math.max(1, Math.floor(rating)),
              title: 'Rigorous Academic Environment but Rewarding Experience',
              body: `Academics are quite rigorous and competitive. However, the learnings and exposure you get here are unparalleled. The state-of-the-art labs and library resources are highly beneficial. Hostels are decent and the mess food is manageable.`,
              author: 'Anjali Gupta',
              batch: 2023,
            },
          ],
        },
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
