# TrainingSetGeneratorTool
Browser Based Tool to Manually Demarcate Regions in Images

## Setup
Clone the repo and open **Generator.html** in your browser to run on custom images. Head to [this link](http://htmlpreview.github.io/?https://github.com/kaivalyar/TrainingSetGeneratorTool/blob/master/Generator.html) for a (slightly slow) preview of the tool with the default images.

## Layout
The page is has 4 main sections:
1. Title
2. Image: shows the image to demarcate a region for.
3. Control Buttons: to download region data, clear it, or move to the next image (with or without auto downloading current image data).
4. Data Display: a display of the data points generated that define the region - which will eventually be downloaded.
5. Alert Circle: a circle sometimes visible in the top right to alert the user of various conditions.

## Usage
Open the page, and use the mouse to either:
* Click and drag to draw line segments defining the sides of the polygon, one edge at a time.
* Double click on the corner points of the polygon defining the region to demarcate.
* Click and drag to fill an entire region to demarcate it.

To download the data, click the **Download** button. The file downloaded has the name `dataX.txt`, where `X` is the image index from the image source filename `imageX.png`.

To clear the durrent data selection, in case of making an error, click the **Clear** button.

To move on to the next image, use the **Next Image** button. The data will be saved depending on the state of the **AutoDownload** checkbox.

The colour codes for the Alert Circle in the top right corner, when visible, are:
* red: mouse drag points being recorded.
* violet: mouse double click points being recorded.
* cyan: no more images to show, cycling back to first image.
