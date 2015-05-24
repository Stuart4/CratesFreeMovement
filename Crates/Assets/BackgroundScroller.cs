using UnityEngine;
using System.Collections;

public class BackgroundScroller : MonoBehaviour {
	public float speed = 0.005f;
	public static BackgroundScroller current;
	float pos = 0;
	// Use this for initialization
	void Start () {
		current = this;
	}
	
	// Update is called once per frame
	void Update () {
		pos += speed;
		if (pos > 1f)
			pos += -1f;
		GetComponent<Renderer>().material.mainTextureOffset = new Vector2(pos, 0);
	}
}
