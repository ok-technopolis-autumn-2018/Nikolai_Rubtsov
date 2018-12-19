document.addEventListener('DOMContentLoaded', function () {
    var todosList = document.getElementsByClassName('todos-list')[0];
    var todoInputField = document.getElementsByClassName("todo-creator_text-input")[0];
    var checkAll = document.getElementsByClassName("todo-creator_check-all")[0];
    var taskCounter = document.getElementsByClassName("todos-toolbar_unready-leftCounter")[0];
    var leftCounter = 0;
    var allCounter = 0;
    var filters = document.getElementsByClassName("filters-item");
    var currentFilter = document.getElementsByClassName("filters-item __selected")[0];
    var clearCompletedButton = document.getElementsByClassName("todos-toolbar_clear-completed")[0];
    var todosToolbar = document.getElementsByClassName("todos-toolbar")[0];

    showHideToolbar();

    todoInputField.addEventListener('keypress', function (evt) {
        if ((evt.which === 13) && (todoInputField.value !== '')) {
            todosList.appendChild(addTodo(todoInputField.value));
            updateListByFilter();
            changeCounter(1);
            allCounter += 1;
            showHideToolbar();
        }
    });

    checkAll.addEventListener('click', function (evt) {
        var todoItems = todosList.children;
        for (var i = 0; i < todoItems.length; i++) {
            makeItemDone(todoItems[i]);
        }
        updateListByFilter();
    });

    clearCompletedButton.addEventListener('click', function (evt) {
        clearCompleted();
        showHideToolbar();
    });

    for (var i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', function (evt) {
            currentFilter.classList.remove('__selected');
            currentFilter = evt.target;
            currentFilter.classList.add('__selected');
            updateListByFilter();
        });
    };

    function makeItemDone(item) {
        if (!item.classList.contains("__done")) {
            item.classList.add("__done");
            changeCounter(-1);
        }
        item.getElementsByClassName("todos-list_item_text")[0].style.textDecoration = "line-through";
        item.getElementsByClassName("todos-list_item_text")[0].style.opacity = "0.7";
        item.getElementsByClassName("custom-checkbox_target")[0].checked = true;
    };

    function addTodo(value) {
        var newItem = document.createElement('div');
        newItem.classList.add("todos-list_item");
        newItem.appendChild(new function () {
            var checkBox = document.createElement('div');
            checkBox.classList.add("custom-checkbox todos-list_item_ready-marker");
            var checkInput = document.createElement('input');
            checkInput.type = "checkbox";
            checkInput.classList.add("custom-checkbox_target");
            checkInput.setAttribute('aria-label', 'Mark todo as ready');

            checkInput.addEventListener('click', function (ev) {
                var item = ev.target.closest("todos-list_item");
                if (ev.target.checked === true) {
                    if (!item.classList.contains('__done')) {
                        item.classList.add('__done');
                    }
                    item.getElementsByClassName("todos-list_item_text")[0].style.textDecoration = "line-through";
                    item.getElementsByClassName("todos-list_item_text")[0].style.opacity = "0.7";
                    changeCounter(-1);
                } else {
                    if (item.classList.contains('__done')) {
                        item.classList.remove('__done');
                    }
                    item.getElementsByClassName("todos-list_item_text")[0].style.textDecoration = "none";
                    item.getElementsByClassName("todos-list_item_text")[0].style.opacity = "1";
                    changeCounter(1);
                }
                updateListByFilter();
            });

            var checkBoxVisual = document.createElement('div');
            checkBoxVisual.classList.add("custom-checkbox_visual");
            var checkBoxVisualIcon = document.createElement('div');
            checkBoxVisualIcon.classList.add("custom-checkbox_visual_icon");
            checkBoxVisual.appendChild(checkBoxVisualIcon);
            checkBox.appendChild(checkInput);
            checkBox.appendChild(checkBoxVisual);
            return checkBox;
        });

        newItem.appendChild(new function () {
            var removeButton = document.createElement('button');
            removeButton.classList.add("todos-list_item_remove");
            removeButton.setAttribute('aria-label', 'Delete todo');

            removeButton.addEventListener('click', function (ev) {
                if (!ev.target.parent.classList.contains('__done')) {
                    changeCounter(-1);
                }
                allCounter += -1;
                todosList.removeChild(ev.target.parent);
            });

        });

        newItem.appendChild(new function () {
            var itemText = document.createElement('div');
            itemText.classList.add("todos-list_item_text-w");
            var textArea = document.createElement('textarea');
            textArea.classList.add("todos-list_item_text");
            textArea.value = value;
        });

        return newItem;
    };

    function changeCounter(count) {
        leftCounter += count;
        if (leftCounter === 0) {
            checkAll.style.visibility = 'hidden';

        } else {
            checkAll.style.visibility = 'visible';
        }
        taskCounter.data = leftCounter + 'items left';
    };

    function updateListByFilter() {
        switch (currentFilter) {
        case filters[0] : {
            for (var i = 0; i < todosList.children.length; i++) {
                todosList.children[i].style.display = 'block';
            }
            break;
        }
        case filters[1] : {
            for (var i = 0; i < todosList.children.length; i++) {
                if (!todosList.children[i].classList.contains('__done')) {
                    todosList.children[i].style.display = 'block';
                } else {
                    todosList.children[i].style.display = 'none';
                }
            }
            break;
        }
        case filters[2] : {
            for (var i = 0; i < todosList.children.length; i++) {
                if (todosList.children[i].classList.contains('__done')) {
                    todosList.children[i].style.display = 'block';
                } else {
                    todosList.children[i].style.display = 'none';
                }
            }
            break;
        }
        }
    };

    function clearCompleted() {
        for (var i = 0; i < todosList.children.length; i++) {
            if (todosList.children[i].classList.contains('__done')) {
                todosList.removeChild(todosList.children[i]);
                allCounter -= 1;
            }
        }
    };

    function showHideToolbar() {
        if (allCounter === 0) {
            todosToolbar.style.visibility = 'hidden';
            checkAll.style.visibility = 'hidden';
        } else {
            todosToolbar.style.visibility = 'visible';
            checkAll.style.visibility = 'visible';
        }
    };
}