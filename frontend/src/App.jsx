import { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Typography, Card, Row, Col, Table, Tag, Button, message } from 'antd';
import { BarChartOutlined, DatabaseOutlined, ProfileOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  { key: 'dashboard', icon: <BarChartOutlined />, label: '数据总览' },
  { key: 'resources', icon: <DatabaseOutlined />, label: '资源管理' },
  { key: 'reports', icon: <ProfileOutlined />, label: '统计报表' }
];

const columns = [
  {
    title: '数据主题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
    render: (value) => <Tag color="blue">{value}</Tag>
  },
  {
    title: '总量',
    dataIndex: 'totalCount',
    key: 'totalCount'
  },
  {
    title: '活跃数',
    dataIndex: 'activeCount',
    key: 'activeCount'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  }
];

const statCards = [
  { title: '资源覆盖率', value: '83%', desc: '覆盖市州 14/17' },
  { title: '数据汇聚量', value: '2.19M', desc: '环比 +12.4%' },
  { title: '活跃用户', value: '126k', desc: '近7日均值' },
  { title: '应用服务', value: '86', desc: '已上线' }
];

function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalCount = useMemo(() => {
    return records.reduce((sum, item) => sum + (item.totalCount || 0), 0);
  }, [records]);

  const activeCount = useMemo(() => {
    return records.reduce((sum, item) => sum + (item.activeCount || 0), 0);
  }, [records]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/data-records');
      setRecords(response.data || []);
    } catch (error) {
      message.error('数据加载失败，请检查后端服务与数据库连接。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Layout className="app-layout">
      <Sider width={220} className="app-sider">
        <div className="logo">
          <Text className="logo-title">湖北智慧教育</Text>
          <Text className="logo-subtitle">数据管理平台</Text>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={menuItems} />
      </Sider>
      <Layout>
        <Header className="app-header">
          <Title level={4}>平台数据管理</Title>
          <div className="header-actions">
            <Button type="primary" onClick={fetchRecords}>刷新数据</Button>
          </div>
        </Header>
        <Content className="app-content">
          <Row gutter={[16, 16]}>
            {statCards.map((item) => (
              <Col xs={24} sm={12} lg={6} key={item.title}>
                <Card className="stat-card">
                  <Text className="stat-title">{item.title}</Text>
                  <Title level={3} className="stat-value">{item.value}</Title>
                  <Text type="secondary">{item.desc}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} className="summary-row">
            <Col xs={24} md={12}>
              <Card>
                <Title level={5}>汇聚总量</Title>
                <Title level={2}>{totalCount}</Title>
                <Text type="secondary">当前平台汇聚的资源总量</Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={5}>活跃数据量</Title>
                <Title level={2}>{activeCount}</Title>
                <Text type="secondary">近30天活跃数据</Text>
              </Card>
            </Col>
          </Row>

          <Card className="table-card" title="数据管理清单" extra={<Text type="secondary">数据来源：自建Mock写入MySQL</Text>}>
            <Table
              columns={columns}
              dataSource={records}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
