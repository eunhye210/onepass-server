# OnePass

OnePass는 쉽고 안전한 로그인 서비스를 지원하는 비밀번호 관리 어플리케이션입니다.<br />
사이트별 아이디와 비밀번호를 저장하여, 사용자가 비밀번호를 기억할 필요 없이 바로 로그인할 수 있도록 도와줍니다.

<br />

## 🚀 **Motivation**
로그인할 때 비밀번호가 기억나지 않아 여러 번 입력해보신 적 없으신가요?<br />
사이트별 요구사항이 달라 비밀번호를 조금씩 다르게 설정하다 보면 잘 기억나지 않을 때가 많습니다.<br />
때로는 여러 사이트에 동일한 비밀번호를 사용하여 보안이 걱정이 될 때도 있습니다.<br />
이러한 문제를 해결하고자 나만의 비밀번호 관리자, OnePass를 개발하게 되었습니다.

[OnePass 바로가기](https://www.one-pass.co)<br />
[Client Repository 바로가기](https://github.com/eunhye210/onepass-client)<br />

<br />


## 📑 **Project Brief**

<details>
  <summary>🌈 Feature</summary>
  <table style="font-size: 13px; text-align: center">
    <tr>
      <th><img src="https://user-images.githubusercontent.com/109640924/204111595-f5317d54-2b13-4bec-8667-45d20fa1d700.gif" width="300" height="200" ></th>
      <th><img src="https://user-images.githubusercontent.com/109640924/204111050-92dfce75-0c89-4f38-9db5-7aaffb21704f.gif" width="300" height="200" ></th>
    </tr>
    <tr>
      <th>1. 회원가입시 사용자를 확인할 수 있는 Confirmation Code를 전송합니다.</th>
      <th>2. 비밀번호를 까먹었을 경우, 가입한 이메일에 OneTimePassword를 전송합니다.</th>
    </tr>
    <tr>
      <th><img src="https://user-images.githubusercontent.com/109640924/204111525-1e3fe46a-9cf7-4730-b836-733c6c880e66.gif" width="300" height="200" ></th>
      <th><img src="https://user-images.githubusercontent.com/109640924/204111480-d71e23ea-d32c-4796-8505-fdf2bb0418c1.gif" width="300" height="200" ></th>
    </tr>
    <tr>
      <th>3. 비밀번호는 직접 입력하거나, 파일 불러오기를 통해 추가할 수 있습니다.</th>
      <th>4. 등록한 비밀번호는 수정하거나 삭제할 수 있습니다.</th>
    </tr>
    <tr>
      <th><img src="https://user-images.githubusercontent.com/109640924/204111466-0abd0033-863c-425c-b2f8-0a715062f621.gif" width="300" height="200" ></th>
      <th><img src="https://user-images.githubusercontent.com/109640924/204112292-dc227264-0962-4869-a971-834201cac26a.gif" width="300" height="200" ></th>
    </tr>
    <tr>
      <th>5. 비밀번호 생성 타입 및 세션 만료 시간을 설정할 수 있습니다.</th>
      <th>6. 마스터 비밀번호를 변경할 수 있고, 탈퇴 시에는 저장한 모든 DB가 삭제됩니다.</th>
    </tr>
    <tr>
      <th><img src="https://user-images.githubusercontent.com/109640924/204112542-c2a92f66-0c14-4144-9ab0-8ec66387ce91.gif" width="300" height="200" ></th>
      <th><img src="https://user-images.githubusercontent.com/109640924/204112288-7421c9b4-1a2c-49d9-bbbe-0377c5d24883.gif" width="300" height="200" ></th>
    </tr>
    <tr>
      <th>7. 등록된 정보가 있는 경우, 해당 username과 password를 바로 입력할 수 있습니다.</th>
      <th>8. 등록된 정보가 없는 경우, 사용자 옵션에 맞는 랜덤한 비밀번호를 생성해 줍니다.</th>
    </tr>
  </table>
</details>

<details>
  <summary>🗓 Project Schedule</summary>
  <table width="600px">
    <tr>
      <th>1주차 ( 22.11.07 ~ 22.11.13 )</th>
    </tr>
    <tr>
      <td>아이디어 확정, DB schema modeling, 목업, PoC 진행</td>
    </tr>
    <tr>
     <th>2주차 ( 22.11.14 ~ 22.11.20 )</th>
    </tr>
    <tr>
      <td>메인 기능 작업, 프론트 / 백엔드 설계 및 개발</td>
    </tr>
    <tr>
      <th>3주차 ( 22.11.21 ~ 22.11.27 )</th>
    </tr>
    <tr>
      <td>메인 기능 업그레이드, 배포(Netlify, AWS Elastic Beanstalk)</td>
    </tr>
  </table>
</details>

<details>
  <summary>🗂 Stack</summary>
  <table width="600px">
    <tr>
      <th colspan="2">Frontend</th>
      <th colspan="2">Backend</th>
    </tr>
    <tr>
      <td>React</td>
      <td>v 18.2.0</td>
      <td>Node.js</td>
      <td>v 14.17.0</td>
    </tr>
    <tr>
      <td>React-router-dom</td>
      <td>v 6.4.3</td>
      <td>Express</td>
      <td>v 4.16.1</td>
    </tr>
    <tr>
      <td>React-redux</td>
      <td>v 8.0.5</td>
      <td>MongoDB</td>
      <td>v 3.6.3</td>
    </tr>
    <tr>
      <td>thinbus-srp</td>
      <td>v 1.8.0</td>
      <td>thinbus-srp</td>
      <td>v 1.8.0</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>mongodb-client-encryption</td>
      <td>v 1.2.1</td>
    </tr>
  </table>
</details>

<details>
  <summary>🔧 Installation</summary>
  <table style="font-size: 12px">
    <tr>
      <th>Frontend</th>
      <th>Backend</th>
    </tr>
    <tr>
      <th>1. 클라이언트 레포지토리를 클론받습니다.</th>
      <th>1. 서버 레포지토리를 클론받습니다.</th>
    </tr>
    <tr>
      <th>git clone https://github.com/eunhye210/onepass-client.git</th>
      <th>git clone https://github.com/eunhye210/onepass-server.git</th>
    </tr>
    <tr>
      <th>2. 다음과 같이 환경변수를 설정합니다.</th>
      <th>2. 다음과 같이 환경변수를 설정합니다.</th>
    </tr>
    <tr>
      <th>REACT_APP_SERVER_URL=&#60;YOUR_SERVER_URL&#62;</th>
      <th>PORT=&#60;YOUR_PORT_NUMBER&#62;<br/>
          MONGOOSE_URL=&#60;YOUR_MONGOOSE_URL&#62;<br/>
          MAILJET_APIKEY_PUBLIC=&#60;YOUR_MAILJET_PUBLIC_APIKEY&#62;<br/>
          MAILJET_APIKEY_SECRET=&#60;YOUR_MAILJET_SECRET_APIKEY&#62;<br/>
          AWS_ACCESS_KEY_ID=&#60;YOUR_AWS_ACCESS_KEY_ID&#62;<br/>
          AWS_SECRET_ACCESS_KEY=&#60;YOUR_AWS_SECRET_ACCESS_KEY&#62;<br/>
          AWS_KEY_ARN=&#60;YOUR_AWS_KEY_ARN&#62;<br/>
          AWS_KEY_REGION=&#60;YOUR_AWS_KEY_REGION&#62;</th>
    </tr>
    <tr>
      <th>3. 터미널에서 아래 명령어를 실행합니다. </th>
      <th>3. 터미널에서 아래 명령어를 실행합니다. </th>
    </tr>
    <tr>
      <th>npm install<br />
          npm start</th>
      <th>npm install<br />
          npm start</th>
    </tr>
  </table>
</details>

<br />

## ✨ **Keyword**

### **_1. SRP (Secure Remote Password)_**

**< SRP signup & login 로직 >** <br />
<img src="https://user-images.githubusercontent.com/109640924/204110617-2d5ae0fe-daef-449d-afd1-d91e987149a0.svg" alt="srp-img" width="520px" height="370px" >

사용자의 기밀 데이터를 다루는 프로젝트였던 만큼, 클라이언트와 서버간 데이터를 어떻게 주고 받을 지에 대한 고민을 많이 했습니다. 기존에 시도했던 로그인 방식은 비밀번호를 암호화하여 DB에 저장하는 것으로, 해시 암호화를 통해 데이터를 안전하게 저장한다는 장점이 있지만, 클라이언트와 서버간의 통신 속 데이터가 유출되거나 방대한 해시 데이터를 가진 공격자로부터 취약해질 수 있다는 위험성이 있었습니다. 로그인 이후의 요청과 응답에서도, 데이터를 단순히 body에 넣기보다 암호화를 통해 안전한 통신이 이루어질 필요가 있었습니다.

위와 같은 문제에 대응하고자 SRP 방식을 채택하게 되었습니다. SRP 로그인은 인증 과정에서 비밀번호가 서버로 전송되지 않고, 매 로그인 마다 일회성의 sessionKey가 생성되어 양방향 암호화 통신이 가능하다는 장점이 있습니다.

1. 회원가입시 비밀번호 대신 전송되는 verifier은 ( salt, email, password )로부터 도출한 암호키를 활용하여 생성된 랜덤 문자열로, 해싱과는 달리 비밀번호를 추측하는데 사용될 수 없습니다.
2. 사용자 인증은 일회성의 public Key(A, B) & secret Key(a, b)를 바탕으로 이루어집니다. 클라이언트와 서버는 A와 B를 서로 교환함으로써, 자신의 secret Key와 상대방의 public Key를 갖고 인증 여부를 계산합니다. 각자의 키로 계산한 결과값이 서로 일치하였을 때 최종적으로 로그인이 성공합니다.
3. 로그인 성공시 클라이언트와 서버는 일회성의 sessionKey를 공유하게 되며, 로그인 이후의 모든 요청 & 응답에서 해당 키를 활용한 양방향 암호화 통신(AES 알고리즘 사용)을 진행했습니다.

<br />

### **_2. Master Key & DEK (Data Encryption Key)_**

**< KMS & DEK 로직 >** <br />
<img src="https://user-images.githubusercontent.com/109640924/204110696-e403aeb9-6593-45c4-b666-4125524f7cd0.svg" alt="dek-img" width="500px" height="280px" >

**< DB 저장 예시 >** <br />

```javascript
// __keyVault
{
  _id: UUID("<string>"),
  keyMaterial: BinData(0,"<encrypted binary data string>"), // 데이터 암호화, 복호화에 사용
  creationDate: ISODate("2022-11-25T13:44:55.192+00:00"),
  updateDate: ISODate("2022-11-25T13:44:55.192+00:00"),
  masterKey: {
    provider: "<string>", // aws
    region: "<string>", // ap-northeast-2
    key: "<string>"  // AWS ARN : Amazon의 리소스를 고유하게 식별하기 위해 사용
  }
}

// User
{
  _id: ObjectId("<string>"),
  username: "<string>",
  passwordList: [
    {
      url: "www.naver.com",
      username: "test@naver.com",
      password: ********  // Binary 형식으로 저장됨
    }
  ]
  ...
}
```
<br />

DB에 저장하는 방식 또한 중요합니다. 단순히 사용자별 대칭키를 생성하여 양방향 암호화 방식을 진행할 수도 있었지만, 해당 방식으로는 DB가 해킹되었을 경우 데이터 하나가 복호화된다면 나머지도 자연스럽게 복호화된다는 위험성이 었었습니다. 이에 별도의 공간에 MasterKey를 생성하여 이중 암호화 절차를 밟는 방식을 진행하게 되었습니다.

1. Master Key : AWS KMS(Key Management Service)에서 관리했습니다. 사용자의 데이터가 저장된 MongoDB가 아닌 별도의 공간(AWS)에서 관리함으로써 만약의 DB 유출시에도 데이터를 복호화할 수 없도록 이중 보안을 구축했습니다. MasterKey는 DEK를 암호화하거나 복호화하는데 사용됩니다.
2. DEK : libmongocrypt에서 생성되고 MasterKey를 사용하여 암호화된 키입니다. DEK는 데이터를 암호화하고 해독하는데 사용됩니다. 무작위 암호화 알고리즘(AEAD_AES_256_CBC_HMAC_SHA_512-Random)을 사용하여 같은 데이터 값이라도 매번 다른 암호화 결과물이 도출될 수 있도록 했습니다.

<br />

### **_3. Chrome Extension_**

크롬 익스텐션을 사용하기 위한 환경을 구축하며 빌드 엔트리를 나눌 필요가 있었습니다. CRA는 기본적으로 SPA를 지원하기 때문에 익스텐션을 위한 별도의 페이지를 추가하기 위해서는 multiply entry를 설정해야 했습니다. 하지만 막상 웹팩 설정을 변경하려고 하니 어디서 어떻게 바꿔야할지 막막했던 것 같습니다. CRA의 편함을 즐기기 위해선 CRA가 무엇을 해주는지 알아야 할 필요가 있었지만, 실상은 그 편함만을 당연히 여기고 있었기 때문입니다. 그러한 과정 속 무심코 지나갔던 웹팩에 대해 보다 자세히 알아보는 계기가 되었습니다. CRA가 많은 것을 대신 해주고 있었다는 것을 깨닫는 동시에, 기본적으로 제공하는 것들 중에 사용하지 않은 부분도 많다는 점을 깨닫게 되었습니다. 프로젝트 구조를 파악하는 것의 중요성을 느끼며, 이번 경험을 토대로 다음 프로젝트에서는 CRA 없이 좀 더 능동적이고 자유로운 개발환경도 구축해보고자 합니다.

실제 익스텐션을 개발하는 과정에 있어서는 탭 별 정보를 얻어 DOM에서 필요한 부분만을 조작하는 것이 핵심이었습니다. 이에 크롬 api를 활용하여 탭 이동 및 새 탭 활성화에 따른 tab id 및 url 정보를 얻었고, 여기서 도메인 네임만을 추출하여 사용자 DB 속 데이터 유무를 확인했습니다. 비밀번호는 input type이 password로 설정되어있다는 점을 바탕으로, DOM 내 해당 태그를 찾아 사용자의 username과 password 값을 넣어줬습니다.

<br />

## **📌 프로젝트 소감**

문제 해결은 원인 파악으로부터.

개발하며 여러 에러에 부딪히곤 했습니다. 모르는 것이 문제가 될 때도 있었고, 알고 작성한 코드가 에러를 발생시킬 때도 있었습니다. 이때, 발생한 에러를 꼼꼼히 읽고 조금씩 그 범위를 좁혀가며 어디서 왜 어떤 에러가 발생했는지 파악하고자 노력했습니다. 처음엔 에러의 빨간 글씨가 두려울 때도 있었지만, 시간이 갈수록 오히려 에러의 존재가 문제를 빠르게 파악하고 해결하는데 큰 도움이 된다는 점을 느낄 수 있었습니다. 명확한 원인 파악으로부터 문제 해결이 시작된다는 점을 배웠습니다.

오늘보다 더 성장한 내일의 개발자로.

결과적으로는 목표한 바를 구현했지만, 그 과정 속 제 한계에 부딪혀 보며 더 배우고 성장하고픈 마음이 강해졌습니다. 프로젝트의 구조는 어떻게 잡아야 할지 그리고 어떻게 하면 코드를 더 간결하고 이해하기 쉽게 작성할 수 있을 지 등 개발의 모든 부분에서 끊임없는 고민의 연속이었던 것 같습니다. 때로는 기능 구현이라는 우선 순위에 밀려 기본에 집중하지 못하였다는 아쉬움도 남았지만, 이것을 프로젝트의 끝이 아닌 새로운 시작으로 앞으로 더 배우고 도전하며 부족했던 부분을 하나 둘 채워나가고자 합니다. 나의 한계를 알고, 그 한계의 경계선을 밀어내는 개발자로서 성장하겠습니다.
