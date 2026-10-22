export type Member = { name: string; role: string; photo: string; bio: string };
export type Group = { region?: string; members: Member[] };
export type Department = { name: string; groups: Group[] };

const MIRTA_BIO =
  "She has decades of experience in International Affairs in the Academic and Diplomatic areas through events, along with academic and business programs. She is Doctor Professor in European Identity (Ph.D) and she has been working in Europe, USA, LATAM, Africa and Middle East in the Strategic Investments field. Master in International Affairs and Trading and also Expert in the Art Market.";
const MARTIN_BIO =
  "Seasoned oil and gas professional with expertise spanning both upstream (exploration, production, and drilling) and downstream (refining, marketing, and distribution) operations. Committed to staying up-to-date with industry trends, technologies, and innovations, with a passion for driving growth and improvement. Dedicated to delivering high-quality results, exceeding expectations, and making a positive impact in the oil and gas industry.";

export const departments: Department[] = [
  {
    name: "Administration Department",
    groups: [
      {
        members: [
          { name: "Mirta R. Acero, Ph.D", role: "Chief Executive Officer", photo: "/images/team/mirta.webp", bio: MIRTA_BIO },
          { name: "Mrs. Mery Austin", role: "Executive Manager", photo: "/images/team/mery.webp", bio: "Mery is an international executive secretary with extensive experience in the luxury, tourism and education sectors, with a professional career that remains in constant evolution. She talks English, Spanish and Hindi." },
          { name: "Mr. Sergio Martín", role: "Director of Administration", photo: "/images/team/sergio.webp", bio: "He is experienced in office automation and also in graphic design in 2D and 3D environments. He is very methodical and a great professional. He is a Physiotherapist specialized in Aesthetics and the musculoskeletal system with more than 23 years of experience, and also a Senior Clinical and Biomedical Laboratory Technician." },
          { name: "Mr. George Alexander", role: "Head of Human Resources", photo: "/images/team/george.webp", bio: "He is an expert in Human Resources in India & Middle East. He has worked with several financial firms. Also writer, speaker, and human resource trainer. He holds a Master’s in Social Work from the University of Kerala and a Master of Research in Social Sciences degree from Mahatma Gandhi University. He has penned several books. He knows how to build bridges of understanding between different faiths and cultures." },
        ],
      },
    ],
  },
  {
    name: "International Marketing Department",
    groups: [
      {
        members: [
          { name: "Mr. Luis A. Muñoz M.", role: "International Communications Producing", photo: "/images/team/luis.webp", bio: "International Mass Media Producer, with a career of more than 30 years in the international television industry, sharing jobs in different companies such as: Venevisión, Venevisión International Miami, Televen, Latina Producciones Panamá, Channel 10 Television Tenerife and gaining experience until obtaining the production company Golden Boy Productions Tv to generate entertainment content based on the rescue of family values at the service of the international audience." },
        ],
      },
    ],
  },
  {
    name: "International Finances Department",
    groups: [
      {
        members: [
          { name: "Mr. Michael Egan", role: "Head of International Finances", photo: "/images/team/michael.webp", bio: "Accountant & Tax Advisor who started his career as an accountant for a software development start-up in Ireland that grew to have 15 offices worldwide before its eventual sale. It was challenging and he found that he had a passion for dealing with the planning and integration of different tax and cultural systems. He works for a firm since 1995 that specialises in tax efficiency for international mobile people and businesses. Although he still consults for the practice on certain projects, he now concentrates on international tax planning for Corporate Structures and HNW individuals." },
          { name: "Jonathan Cepeda", role: "International Finances", photo: "/images/team/jcepeda.webp", bio: "Financial administrator with a Master of Business Administration (MBA), trilingual. Specialist in Financial Intelligence (FIU) and certified in AML/SARLAFT. He has 9 years of experience in risk management, internal control, auditing, regulatory compliance, and strategies for high finance. Extensive knowledge of the financial system, its operations, and structuring. Solid knowledge of banking products and services across different lines of business. Skills in the prevention of money laundering and terrorist financing. He is currently pursuing a specialization in negotiation and corporate ethics." },
        ],
      },
    ],
  },
  {
    name: "IT Department",
    groups: [
      {
        members: [
          { name: "Mr. Lucas Bozzolo", role: "Head of IT Department", photo: "/images/team/lucas.webp", bio: "He is a specialist in programming who works for an institution in the Argentine government. Expert in web development. Currently working on the creation of useful and innovative platforms." },
        ],
      },
    ],
  },
  {
    name: "Institutional Relations Department",
    groups: [
      { region: "Europe", members: [{ name: "Mirta R. Acero, Ph.D", role: "European International Relations", photo: "/images/team/mirta.webp", bio: MIRTA_BIO }] },
      {
        region: "USA",
        members: [
          { name: "Mrs. Raquel Cantero", role: "Institutional Relations Miami", photo: "/images/team/raquel.webp", bio: "Expert and hard-worker business woman who leads projects focused on the expansion of operations based in the world of oil, rice, sugar and soy refining, improving the efficiency and diversification of investments of companies dedicated to international trade." },
          { name: "Mr. Uchenna Martin Igbokwe", role: "Institutional Relations Houston", photo: "/images/team/martin.webp", bio: MARTIN_BIO },
        ],
      },
      {
        region: "Latin America",
        members: [
          { name: "Arch. Eric Escala", role: "International Relations Argentina", photo: "/images/team/eric.webp", bio: "He has extensive networking on virtually all continents at the diplomatic, religious, and institutional levels defending and promoting the Continuing Anglican Church. He has two doctorates in Philosophy and Theology. He works with the International Chamber of Commerce and is a member of the international interfaith movement that unites all the faiths of the world." },
          { name: "Mrs. Maria Alice Viggiano", role: "Institutional Relations Brazil", photo: "/images/team/malice.webp", bio: "Technician in Accounting, Pharmaceuticals and Biochemistry - Federal University of Pará. Postgraduate MBA in Project Management for the Social Area of the Fundação Getúlio Vargas in Belém - Pará - Brazil. She was an advisor to the Federal Government for the State of Pará and Director of Health. Expert in government and international relations for more than 43 years." },
          { name: "Mrs. Minerva Lara Batista", role: "Institutional Relations Panama", photo: "/images/team/minerva.webp", bio: "She has worked internationally as an Ambassador for more than 30 years in different countries between Europe and Latin America. Specialized in humanitarian projects related to social and health assistance." },
          { name: "Gen. Raúl Silva Albán", role: "Institutional Relations Perú", photo: "/images/team/raul.webp", bio: "Second General Commander of the Northern Military Region, General of the Peruvian Army and former head of the VI Jungle Brigade. Expert in intergovernmental relations and development in mining, infrastructure and investment." },
          { name: "Mr. Erick Whittingham", role: "International Project Consultant Panama", photo: "/images/team/erick.webp", bio: "Bachelor of Finance and Banking, and a Bachelor in Philosophy, History and Religion. Erick Whittingham has extensive experience in the banking sector, standing out as a Project Consultant in Latin America, Europe and Asia. His career includes the management of complex export and import processes between different nations, optimizing international commercial procedures. His ability to combine his financial knowledge with a deep understanding of historical and cultural dynamics has allowed him to lead strategic initiatives with a holistic and effective approach." },
        ],
      },
      {
        region: "Africa",
        members: [
          { name: "Abraham Torty, M.Sc., MBA, BBA", role: "Institutional Relations Ghana", photo: "/images/team/abraham.webp", bio: "Expert in International Business Facilitation and Financial Services, with 30 years of experience working across West Africa in the sectors of Oil & Gas, Manufacturing, IT & Corporate Service, Products Marketing & Promotion and Business Mgt Consultancy. He is a specialist in: Institutional Relations in Public and Private spheres, Business Mgt, Consultancy & Development and Corporate strategy." },
          { name: "Mr. Peter Kimani", role: "Institutional Relations Kenya", photo: "/images/team/peter.webp", bio: "Experienced executive director in international areas in all Central and South Africa, with more than 30 years of activity in Kenya working in fields such as banking, logistic, global haulage and manufacturing. Large experience in institutional relations in public and private spheres as well as in the banking system." },
          { name: "Mr. Uchenna Martin Igbokwe", role: "Institutional Relations Nigeria", photo: "/images/team/martin.webp", bio: MARTIN_BIO },
          { name: "Mr. Rixy Machika", role: "Institutional Relations Malawi & South Africa", photo: "/images/team/rixy.webp", bio: "Master of Science in International Trade Policy and Trade Law - Lund University. Advanced Postgraduate Diploma in International Trade Policy and Trade Law - Lund University. Bachelor of Science in Statistics and Earth Science - University of Malawi. Versatile professional specializing in structural transformation, business development, project preparation and development, investment, trade and infrastructure finance, mining and trade policy and law. Proficient in driving global economic growth through strategic expertise." },
          { name: "Crispin Manuel, MBA", role: "Institutional Relations Equatorial Guinea", photo: "/images/team/manuel.webp", bio: "Expert in intergovernmental relations, telecommunications engineering and data processing. Dedicated to the management of international relations in the context Central African." },
        ],
      },
      {
        region: "India, Australia & Oceania",
        members: [
          { name: "Mr. Srinivasan Venkataraman", role: "Institutional Relations India, Australia & Oceania", photo: "/images/team/vasan.webp", bio: "B.Tech (Electrical), M.Tech (Computer Science), MBA (Melbourne University, Australia). Specialist in IT Security Policy & Standards implementation, Risk Analysis and Mitigation Strategies, avoiding Financial & Reputational Loss. He has worked in the Banking Sector, with emphasis on Fraud Prevention and Control. Expert in evaluating and implementing new technologies, with private - public equity, with special interest in Community Health Planning, Medical & Technological Advances, Environment Protection and Waste Management." },
        ],
      },
      {
        region: "Arab World",
        members: [
          { name: "Mr. Ehab Sleit", role: "Institutional Relations Arab World", photo: "/images/team/ehab.webp", bio: "Ehab Sleit is Egyptian and works representing the Royal House of Al-Qassemi of RAK in the Emirates. He has his own Real Estate company associated with Sheikh Faisal Al-Qassemi, and is an expert in internationalization within the Arab world. He is a good friend and an excellent negotiator." },
        ],
      },
    ],
  },
];
