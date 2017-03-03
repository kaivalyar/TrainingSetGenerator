
    var map = null;// reference to the canvas object
    var imageIndex = -1;// index number of the image currently on display
    var imageHeight = -1;// height of the current image
    var imageWidth = -1;// width of the current image
    var totalImages = -1;// total number of images.
    window.onload=function(){
        initMap();// initialise the map, setup canvas, define colors for points, etc
        setUpDrag();// set up recording of coordinates of mouse drags
        setUpDblClick();// set up recording of coordinates of doubleclicks
        initImage();// load first image
    };
    
    // function that sets up the "heatmap"-like display to be overlaid on the picture
    function initMap () {
        var heatmapInstance=h337.create({
            container:document.querySelector('.heatmap'),
            //backgroundColor: 'rgba(10,10,10,0.6)',
            radius:10,
            gradient: {
              '.1': 'rgba(100,100,100,1)',
              '.2': 'rgba(115,15,15,0.9)',
              '.3': 'rgba(130,40,40,0.8)',
              '.4': 'rgba(145,65,65,0.7)',
              '.5': 'rgba(80,80,160,0.6)',
              '.6': 'rgba(95,95,175,0.5)',
              '.7': 'rgba(105,105,190,0.4)',
              '.8': 'rgba(220,220,220,0.3)',
              '.8': 'rgba(250,250,250,0.2)',
              '.9': 'rgba(0,0,0,0.9)'
            },
            maxOpacity: 0.95,
            minOpacity: 0.15
        });
        map = heatmapInstance;
        //alert(map._max);
    }
    
    // sets up the recording of the pointer coordinates when user drags
    function setUpDrag () {
        var isDrag = false;
        document.querySelector('.demo-wrapper').onmousedown = function() {
            isDrag = true;
        }
        document.querySelector('.demo-wrapper').onmouseup = function() {
            isDrag = false;
            document.getElementById('list').innerHTML += (' <hr> ');
            //noOfLines++;
        }
        document.querySelector('.demo-wrapper').onmousemove=function(ev){
            if (isDrag) {
                //document.getElementById('list2').innerHTML += ('+');
                addPoint(ev.layerX, ev.layerY);
            } else {
                //document.getElementById('list2').innerHTML += ('-');
            }
        };
    }
    
    // sets up the recording of the pointer coordinates when user drags
    function setUpDblClick () {
        document.querySelector('.demo-wrapper').ondblclick=function(ev){
            addPoint(ev.layerX, ev.layerY, true);
        };
    }
    
    function initImage() {
        var img = new Image();
        imageIndex = 1;
        totalImages = 5;
        img.src = "images/image1.png";//window.getComputedStyle(document.getElementById('image-container')).getPropertyValue("background-image").replace(/url\(|\)$/ig, "");
        //alert(img.src);
        imageHeight = img.height;
        imageWidth = img.width;
        resizeClickBox();// if the image is too large
        
        //var image = new Image();
        //image.src = document.getElementById('image-container').style.background;
        //image.onload = function() {
        //    imageWidth = image.naturalWidth,
        //    imageHeight = image.naturalHeight
        //};
        
        //alert(imageHeight + " " + imageWidth);
    }
    
    var resized = false;
    // enlargens the clickbox if image doesn't fit, or resets to normal size if box was previously resized
    function resizeClickBox () {
        var bisrc = window.getComputedStyle(document.getElementById('image-container')).getPropertyValue("background-image").replace(/url\(|\)$/ig, "");
        if (resized) {
            resized = false;
            document.getElementById('image-container').style = "height: 75%; width: 90%; background-image: url(" + bisrc + ");";
            map = null;
            document.getElementById('canvas-container').innerHTML = "";
            initMap();
        }
        boxWidth = document.getElementById('image-container').clientWidth;
        boxHeight = document.getElementById('image-container').clientHeight;
        if (imageWidth <= 0 || imageHeight <= 0) alert('image dimension too low');
        if (imageWidth > boxWidth || imageHeight > boxHeight) {
            //alert(bisrc);
            if (imageWidth > boxWidth && imageHeight > boxHeight) {
                document.getElementById('image-container').style = "height: " + (imageHeight + 40) + "; width: " + (imageWidth + 20) + "; background-image: url(" + bisrc + ");";
            } else if (imageWidth > boxWidth) { // only width
                document.getElementById('image-container').style = "width: " + (imageWidth + 20) + "; background-image: url(" + bisrc + ");";
            } else { // only height
                document.getElementById('image-container').style = "height: " + (imageHeight + 40) + "; background-image: url(" + bisrc + ");";
            }
            //alert('box dimension smaller than image dimension');
            resized = true;
            map = null;
            document.getElementById('canvas-container').innerHTML = "";
            initMap();
        }
    }
    
    // helper - used to add a point to the display and edit the downloadable text area every time user clicks or drags on the image
    var timeoutID = null;
    function addPoint(a, o, db=false) {// abscissa, ordinate
        clearTimeout(timeoutID);
        map.addData({x:a, y:o, value:1});
        var text = document.getElementById('list').innerHTML;
        //alert('9');
        //if (text.indexOf('(') < 0) {
        na = getOffset(a, true);
        no = getOffset(o, false);
        if (db) {
            document.getElementById('list').innerHTML += ('[' + na + ', ' + no + '] ');
            document.getElementById('alert').style = "background-color: rgba(100,60,200,0.9)";
            timeoutID = setTimeout(function(){document.getElementById('alert').style = "background-color: rgba(100,60,200, 0.1)"}, 400);
        } else {
            document.getElementById('list').innerHTML += ('(' + na + ', ' + no + ') ');
            document.getElementById('alert').style = "background-color: rgba(200,60,60,0.9)";
            timeoutID = setTimeout(function(){document.getElementById('alert').style = "background-color: rgba(200,60,60, 0.1)"}, 400);
        }
        //} else {
        //    document.getElementById('list').innerHTML += (', (' + a + ', ' + o + ')');
        //}
    }
    
    // corrects n to represent image coordinate (as per width=true for abscissa, width=false for ordinate) instead of full-canvas coordinate
    function getOffset(n, width) {
        boxWidth = document.getElementById('image-container').clientWidth;
        boxHeight = document.getElementById('image-container').clientHeight;
        if (imageWidth <= 0 || imageHeight <= 0) alert('image dimension error');// delete?
        if (imageWidth > boxWidth || imageHeight > boxHeight) alert('box dimension error');// delete?
        if (width) { //get width offset
            result = n - ((boxWidth-imageWidth)/2);
            if (result >= imageWidth-1) result = imageWidth;
            if (result < 0) result = 0;
            return result;
        } else { // get height offset
            result = n - ((boxHeight-imageHeight)/2);
            if (result >= imageHeight-1) result = imageHeight;
            if (result < 0) result = 0;
            return result;
        }
    }
    
    //invoked when user tries to download data
    function saveListToFile() {
        if (map == null) {
            alert("Unknown Error");
            return;
        } else {
            var textToSave = document.getElementById("list").innerHTML;
            var a = document.body.appendChild(document.createElement("a"));
            a.download = "data" + imageIndex + ".txt";
            a.href = "data:text/html," + textToSave;
            a.click();
        }
    }
    
    //invoked when the user tries to clear the picture (if he makes mistake, for example)
    function clearMap() {
        document.getElementById('alert').style = "background-color: rgba(200,60,60,0)";
        var data = {
            max: undefined,
            min: 0,
            data: []
        }
        map.setData(data);
        //alert(map._max);
        document.getElementById('list').innerHTML = "";
    }
    
    // invoked when user clicks nextImage button
    function loadNextImage() {
        if (document.getElementById("check").checked) {
            saveListToFile();
        }
        clearMap();
        imageIndex = imageIndex+1
        if (imageIndex > totalImages) {
            //alert('wrapping back to first image');
            document.getElementById('alert').style = "box-shadow: -22px 0px 0px 0px rgba(10,150,150,0.95);";// back to first image warning
            imageIndex = 1;
        }
        var img = new Image();
        img.src = ("images/image" + imageIndex + ".png");
        //alert(img.src);
        document.getElementById('image-container').style = "background-image: url(images/image" + imageIndex + ".png)";
        img.onload = function () {
            imageHeight = img.naturalHeight;
            imageWidth = img.naturalWidth;
            resizeClickBox();
        }
        //alert(imageHeight + " " + imageWidth);
    }
    

