/*global chrome*/
console.log("The script has been injected");


const button = document.createElement('button');
button.textContent = '点击添加Tag';
// button.style.background = 'rgba(208, 25, 244, 0.5)';
button.style.background = '#E8FFE8';
const div = document.createElement('div');
div.style.display = 'flex';
div.style.justifyContent= "center";
div.style.borderRadius = '8px';
div.insertAdjacentElement('afterbegin', button);
document.body.insertAdjacentElement('afterbegin', div);

button.addEventListener('click', function () {
    let tabs = [];
    let tags = [];

    chrome.storage.session.get({ "list": [] }, function (object) {
        let dataList = object["list"]
        if(dataList.length == 0) {
            console.log('no tab');
        }
        dataList.forEach(function (tab) {
            tabs.push(tab);
        });
        alert(tabs);
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
        addTag.style.background = '#6666FF';
        addTag.style.zIndex = '9999';
        addTag.style.borderRadius = '8px';


        //done
        const done = document.createElement('button');
        done.textContent = '添加';
        done.id = 'done';
        done.style.float = "left";
        done.style.borderRadius = '8px';
        addTag.insertAdjacentElement('beforeend', done);


        //close
        const close = document.createElement('button');
        close.textContent = '关闭';
        close.id = 'close';
        close.style.float = "right";
        close.style.borderRadius = '8px';
        addTag.insertAdjacentElement('beforeend', close);
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));

        //tagText
        const tagText = document.createElement('input');
        tagText.type = "text";
        tagText.style.float = "left";
        tagText.style.borderRadius = '8px';
        tagText.id = "tagText";
        const note = document.createElement('h');
        note.innerHTML = "请输入Tag，并在输入完成后点击添加";
        note.style.position = "static";
        addTag.insertAdjacentElement('beforeend', note);
        addTag.insertAdjacentElement('beforeend', document.createElement('br'));
        addTag.insertAdjacentElement('beforeend', tagText);


        document.body.insertAdjacentElement('beforeend', addTag);


        //close监听click
        close.addEventListener('click', function () {
            let removebox = document.getElementById("addTag");
            removebox.remove();
        });


        
        //done监听click
        done.addEventListener('click', function () {
            let newTags = [];
            const tagText = document.getElementById("tagText").value;
            if( tagText != "") {
                newTags.push(tagText);
            }
            chrome.runtime.sendMessage('', {
                addTags: newTags,
            }).then(() => {
                let removebox = document.getElementById("addTag");
                removebox.remove();
            });
        });
    }, 500);
});