class wcElementDetails extends HTMLElement
{
	el;

	//============================================================================
	constructor(isEmbeddedHtml = true)
	{
		super();

		// laod the element automatically when defined explictly in HTML
		// this is the only code that will be executed when embedded in the html
		if (isEmbeddedHtml) {
			const tpl = document
				.getElementById('element-details-template')
				.content;
			this.attachShadow({mode: 'open'})
				.appendChild(tpl.cloneNode(true));
			return;
		}

		//
		// everything from here on out executes when the element is
		// managed by your own custom javascript.
		// ie: it is not generated by embedded html
		//
		this.el = document
			.getElementById('element-details-template')
			.content.cloneNode(true);
	};

	//----------------------------------------------------------------------------
	Attach(id, withShadowRoot = true)
	{
		const elContainer = document.createElement("div");
		elContainer.appendChild(this.el);
		if (withShadowRoot) {
			elContainer
				.attachShadow({mode: 'open'})
				.appendChild(elContainer.cloneNode(true));
		}
		document.getElementById(id).appendChild(elContainer);
	};

	//----------------------------------------------------------------------------
	SetSlotName(name) {
		const slot = document.createElement("span");
		slot.innerHTML = name;
		this.el.querySelector('slot[name="element-name"]').replaceWith(slot);
	};
	SetSlotDescription(description) {
		const slot = document.createElement("span");
		slot.innerHTML = description;
		this.el.querySelector('slot[name="description"]').replaceWith(slot);
	};
	SetSlotAttributes(attributes) {
		const slot = document.createElement("dl");
		slot.innerHTML = `
			<dt>name</dt>
			<dd>The name of the slot.</dd>
		`;
		this.el.querySelector('slot[name="attributes"]').replaceWith(slot);
	};
}


////////////////////////////////////////////////////////////////////////////////
//
// required
//
customElements.define('element-details', wcElementDetails);


////////////////////////////////////////////////////////////////////////////////
//
// use these to generate elements via javascript vs html embedding
//
function genWithShadowDom(attachToId, name, description, attributes) {
	const el = new wcElementDetails(false);

	el.SetSlotName(name);
	el.SetSlotDescription(description);
	el.SetSlotAttributes(attributes);

	el.Attach(attachToId, true);
}

function genWithOutShadowDom(attachToId, name, description, attributes) {
	const el = new wcElementDetails(false);

	el.SetSlotName(name);
	el.SetSlotDescription(description);
	el.SetSlotAttributes(attributes);

	el.Attach(attachToId, false);
}
