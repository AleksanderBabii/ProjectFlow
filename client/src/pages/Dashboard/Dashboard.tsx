import React from 'react';
import Header from '../../components/header/Header';
import BoardCard from '../../components/board/BoardCard/BoardCard';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
        <Header />  
        <div className="board-list">
            <BoardCard />
            <BoardCard />
            <BoardCard />   
        </div>
    </div>
  );
}

export default Dashboard;