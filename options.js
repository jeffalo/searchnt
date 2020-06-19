var ruleList = document.getElementById('rules')

var defaultEngines = [{name:'Bing', search:'q', url:'bing.com/search'},{name:'Google', search:'q', url:'google.com/search'},{name:'DuckDuckGo', search:'q', url:'duckduckgo.com/search'},{name:'Yahoo', search:'p', url:'search.yahoo.com/search'}]

var rulesArr = []
//load saved rules in
function loadRules(){
    //TODO: make it load rules to an array or something
    chrome.storage.sync.get(['rules'], function(result) {
        rulesArr = JSON.parse(result.rules)
        generateRules()
      });
    
}

loadRules()

function generateRules(){
    save()
    ruleList.innerHTML = '' //clean div
    rulesArr.forEach(ruleI=>{


        //rule div
        var rule = document.createElement('div')
        rule.id = 'rule'

        var ruleTitle = document.createElement('h4')
        ruleTitle.innerText = ruleI.name+':'

        //from text
        var from = document.createTextNode(' from ')
        //to text
        var to = document.createTextNode(' go to ')

        //select box
        var fromBox = document.createElement('select')

        fromBox.id = 'fromBox_'+ruleI.name

        fromBox.addEventListener('change',function(){saveDrop(ruleI)})

        defaultEngines.forEach(item=>{
            var option = document.createElement('option')
            option.value = item.name

            if(ruleI.from == item.name){
                option.selected = true
            }

            option.innerText = item.name
            fromBox.appendChild(option)
        })


        //select box
        var toBox = document.createElement('select')
        toBox.addEventListener('change',function(){saveDrop(ruleI)})

        toBox.id = 'toBox_'+ruleI.name

        defaultEngines.forEach(item=>{
            var option = document.createElement('option')
            option.value = item.name
            if(ruleI.to == item.name){
                option.selected = true
            }

            option.innerText = item.name
            toBox.appendChild(option)
        })

        var xButton = document.createElement('button')

        xButton.innerText = 'remove rule'

        xButton.addEventListener('click', e=>{
            removeRule(ruleI)
        })
        rule.appendChild(ruleTitle)
        rule.appendChild(from)
        rule.appendChild(fromBox)
        rule.appendChild(to)
        rule.appendChild(toBox)
        rule.appendChild(xButton)
        ruleList.appendChild(rule)
    })
}

function removeRule(thing){
    var removeIndex = rulesArr.map(function(i) { return i.name; })
    .indexOf(thing.name);

    ~removeIndex && rulesArr.splice(removeIndex, 1);
    generateRules()
    save()
}

function save(){
    var value = JSON.stringify(rulesArr)
    console.log(rulesArr.from)
    chrome.storage.sync.set({rules: value}, function() {
        console.log('Value is set to ' + value);
      });
    
}

function createRule(){
    var name = prompt('rule name')
    if (rulesArr.some(e => e.name === name)) {
        alert('sorry bud')
      } else {
        rulesArr.push({name:name, from:'Bing', to:'Google'})
        generateRules()
        save()
      }

}

function saveDrop(item){
    var from = document.getElementById('fromBox_'+item.name).value
    var to = document.getElementById('toBox_'+item.name).value

    var newState = rulesArr.map(obj =>
        obj.name === item.name ? { ...obj, from: from } : obj
    );

    rulesArr = newState
    save()
}



document.getElementById('save').addEventListener('click', e=>{
    save()
})

document.getElementById('addBtn').addEventListener('click', e=>{
    createRule()
})
generateRules()

//please help this was not fun to code why do i do this