import HeaderPattern from './components/HeaderPattern';
import TitleBox from './components/TitleBox';
import InfoBox from './components/InfoBox';
import TableInfo from './components/TableInfo';
import IntroductionParagraph from './components/IntroductionParagraph';
import RedirectLink from './components/RedirectLink';
import { SwapRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Banner from './components/Banner';
import { Timeline } from 'react-twitter-widgets'
import WidgetBot from '@widgetbot/react-embed'
import DiscordButton from './components/DiscordButton';

const HomePage = () => {

  return (
    <div className="home-page">
      <Banner />
      <div className="menu-section background-fade mb-16 pb-40 pt-14">
        <div className="container px-6 md:p-0">
          <HeaderPattern title="Menu"/>
          <div className="m-12"></div>
          <div className="flex flex-wrap gap-4 sm:w-7/12 justify-around m-auto">
            <TitleBox title="Swap"/>
            <TitleBox title="Liquidity"/>
            <TitleBox title="AST Lock"/>
            <TitleBox title="veAST Vote"/>
            <TitleBox title="Rewards"/>
            <TitleBox title="Gauges"/>
            <TitleBox title="astSecretkey"/>
            <TitleBox title="Social"/>
          </div>
          <Image
              className='image-bg w-[400px] h-[250px] md:w-[500px] md:h-[350px]'
              src="/images/bg3_b.svg"
              width={500}
              height={350}
              alt=""
            />
        </div>   
      </div>
      <div className="data-section background-fade mb-16 pb-40 pt-14">
        <div className="container px-6 md:p-0">
          <HeaderPattern title="DATA"/>
          <div className="m-12"></div>
          <div className="flex flex-wrap justify-center">
            <InfoBox title="TOTAL VALUE LOCKED" content="-"/>
            <InfoBox title="CIRCULATING MARKET CAP" content="-"/>
            <InfoBox title="CIRCULATING SUPPLY" content="-"/>
            <InfoBox title="AST PRICE" content="-"/>
            <InfoBox title="24 HOUR VOLUME" content="-"/>
            <InfoBox title="TOTAL LOCKED AST" content="-"/>
            <InfoBox title="EPOCH 8 ENDS IN" content="-"/>
          </div>
        </div>
      </div>
      <div className="info-section background-fade mb-16 pb-40 pt-14">
        <div className="container px-6 md:p-0">
          <HeaderPattern title="ve(3,3) on zkSync"/>
          <div className="m-12"></div>
          <div className="info-detail flex flex-wrap justify-end items-center m-auto">
            <div className="w-full flex justify-center align-center px-6">
              <TableInfo/>
            </div>
            <IntroductionParagraph content={"Asterisk's ve(3,3) protocol operates on the high-performance zkSync network, enabling low fees and high returns for DeFi users.\n Unlock the power of early-mover benefits and long-term profitability, made possible through Asterisk's innovative approach to decentralized financial solutions.\n With fast and secure transactions, Asterisk is the future of DeFi."}/>
            <div className='flex justify-end items-center'>
              <SwapRightOutlined style={{ fontSize: 30 }}/>
              <RedirectLink link="https://asterisk-1.gitbook.io/asterisk/" title="DOCS"/>
            </div>
          </div>
          <Image
            className='image-bg w-[400px] h-[250px] md:w-[500px] md:h-[350px]'
            src="/images/bg3.svg"
            width={500}
            height={350}
            alt=""
          />
        </div>
      </div>
      <div className="secret-key-section background-fade mb-16 pb-40 pt-14">
        <div className="container  px-6 md:p-0">
          <HeaderPattern title="astSecretkey"/>
          <div className="m-12"></div>
          <div className="info-detail flex flex-wrap justify-end items-center m-auto">
            <div className="w-full flex justify-center align-center">
              <Image
                src="/images/secret-key-logo.svg"
                className='object-contain'
                width={500}
                height={350}
                alt=""
              />
            </div>
            <IntroductionParagraph content={"astSecretkey (NFT) is a community-exclusive membership NFT for early members.\nOriginal minters permanently hold a portion of sales revenue or distribution rights even after unhold the NFT.\nBy staking astSecretkey, owners can receive dividends.\nMoreover, the original minters are also entitled to participate in Asterisk's fairlaunch airdrop."}/>
            <div className='flex justify-end items-center'>
              <SwapRightOutlined style={{ fontSize: 30 }}/>
              <RedirectLink link="https://asterisk-1.gitbook.io/docs/astsecretkey-nft" title="astSecretkey"/>
            </div>
          </div>
        </div>
      </div>
      <div className="tweets-section background-fade mb-16 pb-40 pt-14">
        <div className="container px-6 md:p-0">
          <HeaderPattern title="TWEETS"/>
          <div className="m-12"></div>
          <div className="info-detail m-auto">
            <Timeline
              dataSource={{ sourceType: "url", url: "https://twitter.com/asterisk_fi" }}
              options={{
                height: '600',
                theme: 'dark'
              }}
            />
          </div>
          <Image
            className='image-bg w-[400px] h-[250px] md:w-[500px] md:h-[350px]'
            src="/images/bg3_b.svg"
            width={500}
            height={350}
            alt=""
          />
        </div>
      </div>
      <div className="social-section background-fade mb-16 pb-40 pt-14">
        <div className="container px-6 md:p-0">
          <HeaderPattern title="SOCIAL"/>
          <div className="m-12"></div>
          <div className="info-detail flex justify-center items-center m-auto">
            <WidgetBot
              server="1076772025131085898"
              channel="1076772071872417862"
              width={'100%'}
              height={600}
            />
          </div>
        </div>
      </div>
      <div className="team-section background-fade mb-16 pb-40 pt-14">
        <div className="container px-6 md:p-0">
          <HeaderPattern title="TEAM"/>
          <div className="m-12"></div>
          <div className="flex flex-wrap justify-center">
            <InfoBox url="/icons/img3.svg" name="CTO" introduction="10+years experience in IT, including blockchain & web dev. They prioritize ongoing learning & improvement."/>
            <InfoBox url="/icons/img5.svg" name="Backend Engineer" introduction="Experienced blockchain engineer with a history of launching personal projects. Currently leads an indie firm developing blockchain and payment apps for large corporations."/>
            <InfoBox url="/icons/img4.svg" name="CMO" introduction="Experienced in DeFi and CEX development, operation, and maintenance. Currently promoting projects that merge blockchain and public policies through public-private collaboration."/>
            <InfoBox url="/icons/img2.svg" name="COO" introduction="Involved in various blockchain projects since 2018, and many of the tokens they worked on are still listed on CEX."/>
          </div>
          <div className="m-12"></div>
          <div className="info-detail flex flex-wrap justify-end items-center m-auto">
            <IntroductionParagraph content={"No deception. High professionalism. Our dedicated team will lead Asterisk with responsibility, and achieve significant results that are supported by astSecretkey hodlers and protocol participants.\nPlease refer to our teams page for more detailed member information."}/>
          </div>
          <div className='flex justify-end items-center'>
              <SwapRightOutlined style={{ fontSize: 30 }}/>
              <RedirectLink link="https://asterisk-1.gitbook.io/docs/teams" title="Team"/>
            </div>
        </div>
      </div>
      <div className="partner-section background-fade mb-16 pb-40 pt-14">
        <div className="container  px-6 md:p-0">
          <HeaderPattern title="BEST PARTNER"/>
          <div className="m-12"></div>
          <div className='flex justify-center items-center flex-col'>
            <Image
              src='/images/you-logo.png'
              style={{ width: "100%", height: "100%", maxWidth: "500px", maxHeight: "180px" }}
              className='p-5'
              width={500}
              height={180}
              alt="icon"
            />
            <div className="m-5"></div>
            <Image
              src='/images/hexa-logo.png'
              className='w-[30px] h-[34px] md:w-[50px] md:h-[54px]'
              width={50}
              height={54}
              alt="icon"
            />
          </div>
        </div>
      </div>
      <DiscordButton />
    </div>
  );
};

export default HomePage;
