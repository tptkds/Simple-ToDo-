const form = document.getElementById("form"),
            input = document.getElementById("input"),
            trashcan = document.getElementById("trashcan");
            ul = document.getElementById("ul");
        let toDos = [];

        init();

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            paintToDo(input.value);
            input.value = '';
        });
        
        /* todo 전체 삭제 */
        trashcan.addEventListener("click", function(e) {
            localStorage.clear();
            while(ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
            }
            toDos = [];
        })
        /* //todo 전체 삭제// */

        function init() {
            loadToDos();
        }

        function loadToDos() {
            let todos = localStorage.getItem("todos");
            if(todos !== null) {
                todos = JSON.parse(todos);
                todos.forEach(todo => {
                    paintToDo(todo.value);
                });
            }
        }

        function paintToDo(value) {
            /* todo ul에 넣기 */
            let no = toDos.length;
            let li = document.createElement('li');
            let delBtn = document.createElement('span');
            let i = document.createElement('i');
            i.classList.add('fas');
            i.classList.add('fa-minus');
            delBtn.classList.add('delBtn');
            delBtn.appendChild(i);
            delBtn.addEventListener("click", deleteToDo);
            li.classList.add(no);
            li.innerText = value;
            li.appendChild(delBtn);        
            ul.appendChild(li);

            /* todo 저장 */
            let todo = { 
                no: no,
                value: value,
            }
            toDos.push(todo);
            saveToDo(JSON.stringify(toDos)); 
        }

        function deleteToDo(e) {
            localStorage.clear();
            const parentNode = e.target.parentNode.parentNode.className;
            const ul = e.target.parentNode.parentNode.parentNode;
            /* ul의 자식 엘리먼트 모두 삭제 */
            while(ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
            }
            /* 클릭한 노드를 toDos에서 삭제 */
            let filteredToDos = toDos.filter(todo => todo.no != parentNode)  
            toDos = [];

            /* ToDo 그리기 */
            filteredToDos.forEach(todo => {
                paintToDo(todo.value);
            });
        }
        
        function saveToDo(todos) {        
            localStorage.setItem("todos", todos);
        }