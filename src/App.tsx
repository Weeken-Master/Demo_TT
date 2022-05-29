import { UserOutlined ,EditOutlined, DeleteOutlined} from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import React, { useState , useEffect} from 'react';
import { Card } from 'antd';
import complexMenu from './Components/complexMenu';
import { Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';
const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];
const creators = ['a', 'b', 'c', 'd', 'e'];
for (let i = 0; i < 5 ; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: 'ID',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: 'Tên công việc',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: 'Nội dung',
    width: 120,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: 'Tiến độ hoàn thành',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: 'Trạng thái',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: 'Chonh tất cả' },
      a: { text: 'a' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: 'Ngày bắt đầu',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: 'Ngày kết thúc',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },

  {
    title: 'Chức năng',
    width: 140,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: (_, ) => (
      <Space size="middle">
        <a href='#'><Button type="primary"><EditOutlined /></Button></a>
        <a href='#'><Button  type="primary"><DeleteOutlined /></Button></a>
      </Space>
    ),
  },
];
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
        console.log(data);
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
      <ProTable<TableListItem>
      columns={columns}
      rowSelection={{
        
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <Space size={24}>
          <span>
            Số lượng {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              Ẩn
            </a>
          </span>
          <span>{`a: ${selectedRows.reduce(
            (pre, item) => pre + item.containers,
            0,
          )} 个`}</span>
          <span>{`调用量: ${selectedRows.reduce(
            (pre, item) => pre + item.callNumber,
            0,
          )} 次`}</span>
        </Space>
      )}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>批量删除</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      dataSource={tableListDataSource}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      rowKey="key"
      headerTitle="Bảng công việc"
      toolBarRender={() => [<Button key="show">Đang cập nhật</Button>]}
    />
      
      </Card>
        
      </ProLayout>


     
    </ProLayout>
  </div>
    </>
  );
}
export default App;

