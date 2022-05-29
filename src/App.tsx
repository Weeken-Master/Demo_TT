import { UserOutlined ,EditOutlined, DeleteOutlined} from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import React, { useState , useEffect} from 'react';
import { Card } from 'antd';
import complexMenu from './Components/complexMenu';
import { Modal } from 'antd';
import Work from './Components/Work';

// const Work =() =>{
//   return (

//     <>
//     aaaaaaaaaaaa
//     </>
//   );
// };
const App = ()  =>{
  const [data,setdata] = useState([]);
  useEffect(() => {
    fetch("http://103.143.143.216:5000/api/work/all")
    .then(res => res.json())
    .then(
      (result) => {
        setdata(result);
        
      },
      (error) => {
        console.log(error)
      }
  )
  },[]);
  
  return(
    <>
    <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/home',
      }}
      collapsedButtonRender={false}
      collapsed
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      route={{
        routes: [
          {
            path: '/home',
            name: '收藏',
            icon: 'icon-shoucang1',
          },
          {
            path: '/home/overview',
            name: 'FaceBook',
            icon: 'icon-facebook',
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: 'icon-twitter',
          },
        ],
      }}
      headerRender={false}
      disableContentMargin
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        route={{
          routes: complexMenu,
        }}
        navTheme="light"
        style={{
          height: '400px',
        }}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        menuHeaderRender={false}
      >
      
   
      <PageContainer content="Danh sách công việc">
      </PageContainer>
      <Card style={{   }}>
            <Work/>
      
      </Card>
        
      </ProLayout>
    </ProLayout>
  </div>
    </>
  );
}
export default App;

