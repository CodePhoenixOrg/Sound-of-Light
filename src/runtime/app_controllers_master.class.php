<?php
namespace Sol\Controllers;

use Phink\Web\UI\TControl;

class Master extends TControl
{
    
       
	public function createObjects() {

	}

	public function declareObjects() {

	}

	public function displayHtml() {
?>
<!-- Full Page Image Background Carousel Header -->
<div id="myCarousel" class="carousel slide">
    <!-- Indicators -->
    <!-- Wrapper for Slides -->
    <div class="carousel-inner">
        <div id="homeContent" class="item active">
            <!-- Set the first background image using inline CSS below. -->
        </div>
        <div id="adminContent" class="item">
            <!-- Set the second background image using inline CSS below. -->
        </div>
    </div>
</div>

<?php
	}
}
