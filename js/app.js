(function (window,Vue) {
	var list=[
		{
			id:1,
			content:'ccc',
			isFinish:true
		},
		{
			id:2,
			content:'ddd',
			isFinish:false
		},
		{
			id:3,
			content:'eee',
			isFinish:true
		}
	]
	new Vue({
		el: '#app',
		data: {
			dataList: JSON.parse(window.localStorage.getItem('dataList')) || [],
			newTodo: '',
			beforeUpdate: {},
			activeBtn: 1,
			showArr: []
			
		},
		methods: {
			addTodo () {
				if (!this.newTodo.trim()) {
					return
				}
				this.dataList.push({
					content: this.newTodo.trim(),
					isFinish: false,
					id: this.dataList.length ? this.dataList.sort((a, b) => a.id - b.id)[this.dataList.length - 1]['id'] + 1 : 1
				})
				this.newTodo = ''
			},
			delTodo(id){
				this.dataList.splice(id,1)
			},
			delAll(){
				this.dataList=this.dataList.filter(item=> !item.isFinish)
			},
			showEdit(id){
				this.$refs.show.forEach(item => {
					item.classList.remove('editing')
				})
				this.$refs.show[id].classList.add('editing')
				this.beforeUpdate = JSON.parse(JSON.stringify(this.dataList[index]))
			},
			updateTodo (id) {
				if(!this.dataList[id].content.trim()){
					this.dataList.splice(id,1)
				}
				if(this.dataList[id].content !==this.beforeUpdate.content){
					this.dataList[id].isFinish= false
				}
				this.$refs.show[id].classList.remove('editing') 
				this.beforeUpdate={}
			},
			backTodo(id){
				this.dataList[id].content=this.beforeUpdate.content
				this.$refs.show[id].classList.remove('editing')  
				this.beforeUpdate={}
			},
			hashchange(){
				switch(window.location.hash){
					case '':
					case '#/':
					this.activeBtn=1
					break;
					case '#/active':
					this.activeBtn=2
					break;
					case '#/completed':
					this.activeBtn=3
					break
				}
			},
			showAll(){
				this.showArr=this.dataList.map(()=>true)
			}
		},
		//自定义指令
		directives: {
			fouse:{
				inserted(el){
					el.focus()
				}
			}
		},
		//渲染之前运行 生命周期
		created () {
			this.showAll()
			this.hashchange()
			window.onhashchange = () => {
				this.hashchange()
			}
		},

		//渲染后运行的
		mounted () {
			
		},
		//监听
		watch:{	
			dataList: {
				handler (newArr) {
					window.localStorage.setItem('dataList', JSON.stringify(newArr))
				},
				deep: true
			}
		},
		//计算属性
		computed: {
			activeNum () {
				return this.dataList.filter(item => item.isFinish==false).length
			},
			toggleAll:{
				get(){
					return this.dataList.every(item => item.isFinish)
				},
				set(val){
					
					this.dataList.forEach(item => item.isFinish = val)
					
				}
			}
		},
		
	})


})(window,Vue);
