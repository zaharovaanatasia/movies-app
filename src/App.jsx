import './App.css';
import MoviesList from './components/MoviesList';
import { Layout } from 'antd';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <MoviesList />
      </Content>
    </Layout>
  );
}

export default App;
