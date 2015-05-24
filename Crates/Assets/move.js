#pragma strict

var rb : Rigidbody2D;
var animator : Animator;
var antennaAnim : Animator;
var speed : float = 1f;
var upSpeed : float = 100f;
var isGrounded : boolean = false;
var canJump : boolean = true;
var groundCheck : Transform;
var groundRadius : float = 0.2f;
var  whatIsGround : LayerMask;
var torque : float = 5f;
var jumpDelay : float = 1f;
var transmitting : boolean = false;

function Start () {
	rb = GetComponent.<Rigidbody2D>();
	for each(var component in GetComponentsInChildren.<Animator>()) {
		if (component.name == "antenna_0") {
			antennaAnim = component;
		} else if (component.name == "crate") {
			animator = component;
		}
	}
}

function FixedUpdate () {
	if (!transmitting) return;
	isGrounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, whatIsGround);
	var xComponent : float = Input.GetAxis("Horizontal") * speed;
	var yComponent : float = rb.velocity.y;
	if (Input.GetAxis("Jump") > 0 && isGrounded && canJump) {
		yComponent = upSpeed;
		canJump = false;
		Invoke("resetJump", jumpDelay);
	}
	var movementVector : Vector2 = new Vector2(xComponent, yComponent);
	rb.velocity = movementVector;

	//var rotation : float = Input.GetAxis("Rotate"); 
	//transform.Rotate(new Vector3(0, 0, rotation * torque));
	
}

function Update() {
	if (Input.GetButtonDown("SwitchCrate") && transmitting) {
		animator.SetTrigger("nextCrate");
	}
	if (Input.GetButtonDown("Transmit")) {
		antennaAnim.SetTrigger("transmit");
		transmitting = !transmitting;
	}
}

function resetJump() {
	canJump = true;
}