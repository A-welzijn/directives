# A-Welzijn Directives

v1.0.1

### Hoe het te gebruiken

```javascript
"dependencies": {
	"awelzijn-directives": "latest"
 }
```
```javascript
var app = angular.module('yourApp', [
	'awelzijn.directives'
]);
```

Deze component bevat allerlei algemene directives die worden gebruikt voor de opmaak van pagina's e.d.

#### BroadcastService

```javascript
myController.$inject = ['aWelzijnBroadcastService'];
```
```javascript
broadcastservice.send("message");
```
```javascript
scope.$on('message', function (event, data) {
	doSomething();
});
```
Deze service gaat een message [broadcasten](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$broadcast) die kan worden opgevangen in andere scopes/controllers.

#### NavigateOnClick

```html
<div a-welzijn-navigate-on-click state="state.name" params="{id:1}"></div>
```
Deze directive laat toe om op een gemakkelijke manier te navigeren naar een bepaalde state, met parameters.

#### WelzijnTabel

```html
<a-welzijn-table headers="ctrl.headers" actions="ctrl.actions" >
	<table>
		<tbody>
			<tr>
				<td>{{item.prop1}}</td>
				<td>{{item.prop2}}</td>
				<td>{{item.prop3}}</td>
			</tr>
		</tbody>
	</table>
</a-welzijn-table>
```
Deze directive is gemaakt om overzicht-schermen in A-Welzijn op te maken. Met deze directive kan je een hele hoop parameters meegeven.

#### ScrollTo

```html
	<div a-welzijn-scroll-to="randomId"></div>
	
	<div id="randomId"></div>
```
Met deze directive gaat de pagina automatisch verder scrollen naar een bepaald element met de gedefinieerde id.

#### Tabs

```html
<ul class="nav-tabs nav-lg">
	<li a-welzijn-nav-tab="content1" start>Tab1</li>
	<li a-welzijn-nav-tab="content2">Tab2</li>
</ul>


<div a-welzijn-tab-id="content1">
	...
</div>

<div a-welzijn-tab-id="content2">
	...
</div>
```
Deze directive zorgt voor een gemakkelijke implementatie van tabs-navigatie. 
Alle content gaat onder elkaar met een bepaalde tabId en deze content gaat dan getoggled worden d.m.v. de aangeklikte tab.
De tab die bij het laden van de pagina open staat krijgt een 'start' attribuut.