<?php
namespace Sound-of-light\Controllers;

use Phink\Web\UI\TControl;

class Master extends TControl
{
    
       	public function createObjects() {	}	public function declareObjects() {	}	public function afterBindingObjects() {	}	public function displayHtml() {?>
    <!-- Full Page Image Background Carousel Header -->
    <header id="myCarousel" class="carousel slide">
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



    </header>

    <!-- Page Content -->
    <div class="container">
        <hr>
        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; CodePhoenix.org 2016</p>
                </div>
            </div>
            <!-- /.row -->
        </footer>

    </div>
    <!-- /.container -->

<?php	}}