function Car(name,color,status){
    this.name = name;
    this.color = color;
    this.status = status;
}

Car.prototype = {
    run: function(){
        console.log('running');
    },
    stop: function(){
        console.log('stop');
    },
    getSatus: function(){
        console.log('status:' + this.status);
    }

};

var audi = new Car('audi','black','new');
audi.run();
audi.stop();
audi.getSatus();
/*
### OOP 指什么？有哪些特性

OOP指面向对象程序设计，是一种程序开发的抽象方法。在面向对象程序设计中，类定义了一件事物的抽象特点，对象是其实例。
特性：
1. 封装性
封装指在程序设计中隐藏了某一方法的具体运行步骤，取而代之的是用通过传递消息机制，即通常利用接口来保证消息的传入传出。
2. 继承性
子类会继承父类的属性和方法，并且可以自己添加新的属性和方法，或者重写部分属性和方法。
3. 多态性
由继承而产生的不同的子类，其对象会对同一消息做出不同的响应。

### 如何通过构造函数的方式创建一个拥有属性和方法的对象?

```javascript
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['dog','cat'];
}

Person.prototype = {
    constructor:Person,
    sayName: function(){
        console.log(this.name);
    }
}

var person1 = new Person('chen',23,'doctor');

```
### prototype 是什么?有什么特性?

prototype是构造函数都有的一个属性，这个属性是一个指针指向原型对象，原型对象有一个constructor属性，这个属性指向构造函数。通过构造函数创建出来的实例，有个属性叫__proto__，这个__proto__属性指向原型对象。

### 画出如下代码的原型图
```
function People (name){
  this.name = name;
  this.sayName = function(){
    console.log('my name is:' + this.name);
  }
}

People.prototype.walk = function(){
  console.log(this.name + ' is walking');
}

var p1 = new People('饥人谷');
var p2 = new People('前端');
```

<img src="/uploads/default/original/2X/2/231200da1683a9ff4af0aa4105f2184f46142db3.png" width="690" height="387">



###  创建一个 Car 对象，拥有属性name、color、status；拥有方法run，stop，getStatus

```
function Car(name,color,status){
    this.name = name;
    this.color = color;
    this.status = status;
}

Car.prototype = {
    run: function(){
        console.log('running');
    },
    stop: function(){
        console.log('stop');
    },
    getSatus: function(){
        console.log('status:' + this.status);
    }

};

var audi = new Car('audi','black','new');
audi.run();
audi.stop();
audi.getSatus();
```
*/
