# make-a-list app demo

## Description
This demo is made using plain html, css and js. The idea was to start small: make a list where you can delete stuff. Making it work well with older browsers like IE 9. Working my way up to newer versions adding newer features. 

That's step 1. Step 2 was to make it so that when a user refresh the page the list still exists. So by using localstorage we will be able to get the items from the list and also remoe them if we want.

Step 3 is making it work without JavaScript, using Serverside Scripting. When the user has JavaScript disabled, we can still make a list and still delete stuff. Only downside is that you can't delete items from your list.

In the future I want it to work offline either completely, or part of it and also make it more Google Keep like, where you can save a list and give it a name so you can acces it later.

## Browser Support
The app works on old and new browsers. Older browser have limited functionality especially when javascript is limited or not supported. When i talk about old browsers I almost always mean IE < 9.

![Internet Explorer 8](ie.png)

## Device Support
most browser on mobile Devices. Should work on Kindle although functionality is limited.

On mobile:
![android Chrome](images/mobile.jpg)

## Fallback
Here are some of the problems I encoutenred:
- problem #1 preventdefault doesnt work (on IE). 
fix
```
 ecvent.returnValue = false;
 // for event.preventDefault
```
- problem #2 forEach deos not work on IE. fix: no forEach loops, only normal for loops
- problem #3 e.target.matches is not supported (on IE). 
fix: 
```
e.target.msMatchesSelector 
```
- problem #4 autofocus on textbox does not work.
- problem #5 querySelector does not work on ie 8. 

The reason for the server side version is to handle the app without JavaScript enabled. When the user has it disabled all new list items will be send to the server and stored there. When the Javascript is enabled again the server side list items will be added to the client side version. Problem is that the server side list items cant be deleted. 

## Run app
When you have [NODE](https://nodejs.org/en/) & [NPM](https://www.npmjs.com/) on your computer run the following command:
```
npm start
```
Then go to 
> http://localhost:3000/

Or use xpose server with:
```
npm run x
```

### Sources
- [quirksmode (Event Delegation)](http://www.quirksmode.org/js/events_order.html)
- [e.target.matches fix](http://stackoverflow.com/questions/37304037/why-my-code-dont-working-in-ie11)
- [preventdefault fix](http://stackoverflow.com/questions/4479216/does-internet-explorer-supports-e-preventdefault)
- [Javascript get index of child on click](https://stackoverflow.com/questions/20818790/javascript-get-index-of-child-on-click)
-[remove item from array in localstorage](https://stackoverflow.com/questions/39725221/remove-an-item-from-an-array-inside-a-local-storage-object-with-javascripthttps://stackoverflow.com/questions/20818790/javascript-get-index-of-child-on-click)

