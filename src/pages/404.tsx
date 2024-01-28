import Link from 'next/link';
import Banner from './Banner';
import styled from 'styled-components';
import { TwitterShareButton, TwitterIcon } from 'next-share';

const NotFoundPage = () => {
  return (
      <Wrapper>
        <Banner />
        <div className="container">
          <h1>Asterisk will be released soon</h1>
          <p>Stay tuned and look forward to it.</p>
          <TwitterShareButton
            url={'https://asterisk.finance'}
            title={'Stay tuned and look forward to it'}
            color='black'
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    width: 80vw;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .searchBox {
    width: 80%;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }
  .links {
    margin-top: 30px;
  }
  .link {
    margin: 10px;
    color: blue;
    text-decoration: underline;
  }
  .link:hover {
    color: red;
  }
`

export default NotFoundPage;
