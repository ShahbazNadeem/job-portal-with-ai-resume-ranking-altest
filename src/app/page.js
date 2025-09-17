import { Icons } from "@/data/Imports";
import Layout from "./_components/layout/Layout";
import Card1 from "./_components/cards/Card1";
import JobsforUser from "./_components/JobsforUser";

export default function Home() {
  return (
    <Layout>
      <section>
        <div className="container relative">
          <div className="min-h-[90vh] md:max-w-[700px] lg:max-w-[980px] mx-auto flex justify-center flex-col">
            <div className="flex justify-center gap-5 md:gap-8 lg:gap-12 xl:gap-14 text-center flex-col">
              <h1 className="spaceGrotesk">One Step Closer To <span>Your Dream Job</span></h1>

              <span className="text-[18px] font-semibold">Let Us Help You Find A Job That Suits You The Best</span>

              <span className="flex justify-center gap-8 items-center">
                <button className="button1">Get Started</button>
                <span className="flex gap-2 items-center">
                  <span className="btn-gradient-border">
                    <span className="btn-gradient-border-inner body-color">
                      <Icons.play className="text-[#C79AFB] mx-1" size={20} />
                    </span>
                  </span>
                  <span className="text-[18px] font-semibold">Our Story</span>
                </span>
              </span>

              <span className="spaceGrotesk flex justify-center gap-8">
                <span className="flex flex-col gap-2">
                  <span className="text-[32px] font-bold flex items-center">20M<Icons.plus size={20} /></span>
                  <span className="text-[18px] font-semibold">User</span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-[32px] font-bold flex items-center">500K</span>
                  <span className="text-[18px] font-semibold">Jobs</span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-[32px] font-bold flex items-center">100<Icons.plus size={20} /></span>
                  <span className="text-[18px] font-semibold">Partners</span>
                </span>
              </span>
            </div>

          </div>

          <figure className="hidden lg:block absolute top-[35%] right-0 w-[90px] lg:w-[120px] h-auto"><img src="/images/home/arrow2.png" className="w-full h-auto" /></figure>

          <figure className="absolute bottom-0 w-[150px] md:w-[250px] h-auto"><img src="/images/home/arrow1.png" className="w-full h-auto" /></figure>

          <div className="hidden lg:block max-w-[280px] absolute w-full top-[10%] left-[3%]">
            <Card1 className='border -rotate-45 backdrop-blur-xs' />
          </div>
          <div className="hidden lg:block max-w-[240px] absolute w-full top-[55%] right-8">
            <Card1 className='border rotate-45' />
          </div>
          <div className="max-w-[180px] absolute w-full bottom-[0%] md:bottom-[10%] left-[40%] md:left-[30%] lg:left-[20%]">
            <div className="relative blur-xs">
              <Card1 className="border -rotate-45" />
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="container">
          <div className="curved-rectangle flex flex-col gap-3 justify-center flex-wrap md:flex-row items-center md:justify-around">
            <figure className="w-[150px] lg:w-[200px] h-auto"><img src="/images/home/frame11.png" alt='' className="w-full h-auto" /></figure>
            <figure className="w-[70px] lg:w-[100px] h-auto"><img src="/images/home/frame2.png" alt='' className="w-full h-auto" /></figure>
            <figure className="w-[150px] lg:w-[200px] h-auto"><img src="/images/home/frame3.png" alt='' className="w-full h-auto" /></figure>
            <figure className="w-[150px] lg:w-[200px] h-auto"><img src="/images/home/frame4.png" alt='' className="w-full h-auto" /></figure>
          </div>
        </div>
      </section>

      <section className="mt-10 md:mt-20">
        <div className="container">
          <h2 className="font-semibold text-center spaceGrotesk">
            Newest <span className="text-purple-700">Jobs</span> For You
          </h2>
          <div className="mt-3 max-h-[650px] overflow-y-auto hide-scrollbar">
            <JobsforUser />
          </div>
        </div>
      </section>

      <section className="my-10 md:my-20">
        <div className="container">
          <div className="flex justify-between flex-col md:flex-row gap-5">
            <span className="basis-[50%] flex justify-center items-center"><figure className="w-[300px] md:w-[400px] mx-auto"><img src="/images/home/companies.png" /></figure></span>

            <span className="basis-[50%] flex flex-col items-center md:items-start gap-4 justify-center">
              <span className="max-w-[280px] md:max-w-full xl:max-w-[500px] text-center md:text-left spaceGrotesk">
                <h2 className="font-bold">Working With <span className="text-purple-700">Exiting</span> Companies</h2>
                <span>We collaborate with established companies to drive innovation.Together, we create impactful solutions for long-term growth.</span>
              </span>
              <span><button className="button1">Get Started</button></span>
            </span>
          </div>
        </div>
      </section>


    </Layout>
  );
}
