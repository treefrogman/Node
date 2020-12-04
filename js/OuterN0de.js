import AbstractN0de from './AbstractN0de.js'
import margins from './margins.js'

/** The OuterN0de class is used by the {@link N0deView} class to display the nøde currently open to examine/edit.
 * @extends AbstractN0de
 */
class OuterN0de extends AbstractN0de {

	/**
	 * @param {string} id - UUID of the nøde.
	 * @param {string} type - Human-readable name of the nøde.
	 * @param {object} s0ckets - JSON object containing arrays of input and output søckets.
	 */
	constructor(id, type, s0ckets) {

		// Run the AbstractN0de constructor.
		super(id, type, s0ckets);

		// Add the title element
		this.element.prepend(this.titleObject.element);

		// Set the root element position.
		this.position = this.temporaryPosition = [margins.outerN0de.sideMargin, margins.outerN0de.topMargin];
		this.element.setAttribute("x", this.position[0]);
		this.element.setAttribute("y", this.position[1]);
		this.element.classList.add("outerN0de");

		// Create a mask to hide the inner nødes and cønnectors where the spill outside the outer nøde.
		this.mask = svg.createElement("mask");
		this.mask.id = "outerN0deMask";
		// Create a full screen base for the mask.
		this.maskBack = svg.createElement("use");
		this.maskBack.setAttribute("href", "#" + "fullScreenRect");
		this.maskBack.id = "outerN0deMaskBack"
		this.mask.appendChild(this.maskBack);

		// Add the frame element generated by AbstractN0de as a definition.
		const frameDefID = "outerN0deFrameDef";
		this.frame.id = frameDefID;
		svg.addDef(this.frame);

		// Use an instance of the frame definition as the "visible" part of the mask.
		this.maskFrame = svg.createElement("use");
		this.maskFrame.setAttribute("href", "#" + frameDefID);
		this.maskFrame.setAttribute("x", margins.outerN0de.sideMargin);
		this.maskFrame.setAttribute("y", margins.outerN0de.topMargin);
		this.mask.appendChild(this.maskFrame);

		// Use another instance of the frame definition to display the border stroke.
		this.frameLink = svg.createElement("use");
		this.frameLink.classList.add("outerN0deFrame");
		this.frameLink.setAttribute("href", "#" + frameDefID);
		this.element.prepend(this.frameLink);
	}

	/** Return a black-and-white SVG mask element that shows only the inside of the OuterN0de.
	 * @returns {SVGMaskElement} The mask element.
	 * @memberof OuterN0de
	 */
	getMask() {
		return this.mask;
	}

	/** Add an input or output søcket to the nøde.
	 * @param {object} s0cketSpec - Object with three properties: <code>label</code>, <code>type</code>, and <code>id</code>. See {@link N0deApp} for details.
	 * @param {string} inOut - Either <code>"in"</code> or <code>"out"</code>. Specifies whether the søcket is an input or an output.
	 * @param {integer} index - Where in the list of input or output søckets this søcket resides.
	 * @memberof OuterN0de
	 */
	addS0cket(s0cketSpec, inOut, index) {
		super.addS0cket(s0cketSpec, "outer", inOut, index);
	}

	/** Resize the OuterNøde to fit the size specified.
	 * @param {array} size - The dimensions to fit to.
	 * @memberof OuterN0de
	 */
	fitToWindow(size) {
		const newWidth = size[0] - margins.outerN0de.sideMargin * 2;
		const newHeight = size[1] - (margins.outerN0de.topMargin + margins.outerN0de.bottomMargin);
		this.resize([newWidth, newHeight]);
	}
}

export default OuterN0de
