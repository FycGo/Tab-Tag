console.log("The script has been injected");

const button = document.createElement('button');
button.textContent = '点击选择Tag';
// button.style.background = 'rgba(208, 25, 244, 0.5)';
button.style.background = '#E8FFE8';
const div = document.createElement('div');
div.style.display = 'flex';
div.style.justifyContent= "center";
div.insertAdjacentElement('afterbegin', button);
document.body.insertAdjacentElement('afterbegin', div);

button.addEventListener('click', function () {
    let tabs = [];
    let tags = [];

    chrome.storage.local.get({ "list": [] }, function (object) {
        let dataList = object["list"]
        if(dataList.length == 0) {
            console.log('no tab');
        }
        dataList.forEach(function (tab) {
            tabs.push(tab);
        });
    });
    setTimeout(() => {


        //Assign the type of tag to tags[]
        tabs.forEach(function (tab) {
          tab.tag.forEach(function (tagItem) {
            if(!(tags.includes(tagItem))) {
              tags.unshift(tagItem);
            }
          });
        });

        // addTag block
        const addTag = document.createElement('div');
        addTag.id = 'addTag';
        addTag.style.position = 'fixed';
        addTag.style.top = "30%";
        addTag.style.left = "30%";
        addTag.style.width = "250px";
        // addTag.style.height = "200px";
        // div.style.display = 'flex';
        // div.style.justifyContent= "center";
        addTag.style.background = '#E8FFE8';
        addTag.style.zIndex = '9999';


        //done
        const done = document.createElement('button');
        done.textContent = 'done';
        done.id = 'done';
        done.style.float = "left";
        addTag.insertAdjacentElement('beforeend', done);


        //close
        const close = document.createElement('button');
        close.textContent = 'close';
        close.id = 'close';
        close.style.float = "right";
        addTag.insertAdjacentElement('beforeend', close);
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));
        const tagText = document.createElement('input');
        tagText.type = "text";
        tagText.style.float = "left";
        tagText.id = "tagText";
        addTag.insertAdjacentElement('beforeend', tagText);
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));


        // 添加tag条目
        tags.forEach(function (tag) {
            const form = document.createElement('form');
            const tagItem = document.createElement('input');
            tagItem.type = "checkbox";
            tagItem.style.float = "left";
            form.innerHTML = tag;
            form.insertAdjacentElement('beforeend', document.createElement('br'));
            form.insertAdjacentElement('beforeend', document.createElement('br'));
            form.insertAdjacentElement('afterbegin', tagItem);
            addTag.insertAdjacentElement('beforeend', form);
        });
        
        document.body.insertAdjacentElement('beforeend', addTag);


        //close监听click
        close.addEventListener('click', function () {
            let removebox = document.getElementById("addTag");
            removebox.remove();
        });


        
        //done监听click
        done.addEventListener('click', function () {
            alert(document.getElementById("tagText").value);
            // let removebox = document.getElementById("addTag");
            // removebox.remove();
        });

    }, 500);
});