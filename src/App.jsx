import './App.css';
import MoviesList from './components/MoviesList';
import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <MoviesList />
      </Content>
    </Layout>
  );
}

export default App;
