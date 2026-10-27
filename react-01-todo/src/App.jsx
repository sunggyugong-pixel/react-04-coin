import { useState } from 'react';

function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);

    const onChange = (event) => setToDo(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        if (toDo === "") {
            return;
        }
        // 할 일을 추가할 때 text와 완료 여부(completed: false)를 객체 형태로 저장합니다
        setToDos((currentArray) => [{ text: toDo, completed: false }, ...currentArray]);
        setToDo("");
    };

    const deleteToDo = (indexToDelete) => {
        setToDos((currentArray) =>
            currentArray.filter((_, index) => index !== indexToDelete)
        );
    };

    // 할 일을 클릭했을 때 완료 상태를 토글(반전)시키는 함수
    const handleToggleTodo = (index) => {
        const newTodoList = toDos.map((item, i) => {
            if (i !== index) {
                return item; // 내가 클릭한 게 아닌 것은 그대로 둠
            }
            return { ...item, completed: !item.completed }; // 내가 클릭한 것만 completed 상태를 반대로 뒤집음
        });
        setToDos(newTodoList);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>My ToDo ({toDos.length})</h1>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={toDo}
                    type="text"
                    placeholder="하고 싶은일을 써봐..."
                />
                <button>Add To Do</button>
            </form>
            <hr />
            <ul>
                {toDos.map((item, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                        {/* 글자를 클릭하면 완료 상태가 토글되도록 onClick 추가 */}
                        <span
                            onClick={() => handleToggleTodo(index)}
                            style={{
                                cursor: 'pointer',
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: item.completed ? 'gray' : 'black',
                            }}
                        >
              {item.text}
            </span>
                        {' '}
                        <button onClick={() => deleteToDo(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;