import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill('')
  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)

  const handleClick = (index) => {
    if (board[index] === '' && !winner) {
      setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item))
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }
  const checkWinner = () => {
    const possibleWaysToWin = [
      // horizontal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      // vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      // diagonal
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ]

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === 'O'))
        setWinner('O')

      if (cells.every(cell => cell === 'X'))
        setWinner('X')
    })

    checkDraw()
  }
  const checkDraw = () => {
    if (board.every(item => item !== ''))
      setWinner('E')
  }
  const resetGame = () => {
    const player = winner !== 'E' ? winner : currentPlayer

    setCurrentPlayer(player)
    setBoard(emptyBoard)
    setWinner(null)
  }

  useEffect(checkWinner, [board])

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>
      <div className={`board ${winner ? 'game-over' : ''}`}>
        {
          board.map((item, index) => {
            return <div className={`cell ${item}`} onClick={() => handleClick(index)} key={index}>{item}</div>
          })
        }
      </div>
      {
        winner && <button onClick={resetGame}>Recomeçar jogo!</button>
      }
      {
        winner && (
          <footer>
            <h2 className="winner-message">
              {
                winner === 'E'
                ? <span className={winner}>empate!</span>
                : <><span className={winner}>{winner}</span> venceu!</>
              }
            </h2>
          </footer>
        )
      }
    </main>
  );
}

export default TicTacToe;
