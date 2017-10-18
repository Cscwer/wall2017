// GwPopupController.js
let GwPopupController = {}
let count = 0; 

function PopupItem(option){
	this.isShow = false; 
	this.compo_id = option.type + count; 
	count++; 

	Object.assign(this, option); 


	Object.keys(this.handle).forEach(key => {
		this.handle[key] = this.handle[key].bind(this); 
	})
}

PopupItem.prototype.launch = function(){
	setTimeout(() => {
		this.isShow = true; 	

		if (this.needBlur) this.onBlur()
	});

	return this;
}

PopupItem.prototype.close = function(){
	setTimeout(() => {
		this.isShow = false;

		if (this.needBlur) this.offBlur()
	});

	return this; 
}

GwPopupController.create = function(option){
	return new PopupItem(option); 
}

GwPopupController.__setPrototype = function(key, val){
	PopupItem.prototype[key] = val; 
}

export default GwPopupController; 
