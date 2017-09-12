<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <img height="50%" src="<?php echo base_url(); ?>/assets/images/logo-menu.png" alt="logo" class="logo-default"
                onclick="window.location ='<?php echo base_url(); ?>';" style="cursor:pointer" title="Goto Main Menu">
            
            <div class="menu-toggler sidebar-toggler"><span></span></div>
        </div>
        <!-- END LOGO -->

        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
            <span></span>
        </a>
        <!-- END RESPONSIVE MENU TOGGLER -->

        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                
                <!-- BEGIN USER LOGIN DROPDOWN -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <img alt="" class="img-circle" src="<?php echo base_url(); ?>/assets/images/avatar/user.png" />
                        <span class="username username-hide-on-mobile"><?php echo $this->session->userdata('logged_in')['nama_lengkap']; ?></span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default">
                        <li>
                            <a href="#">
                                <i class="icon-user"></i> My Profile </a>
                        </li>                        
                        <li>
                            <a href="<?php echo base_url(); ?>/auth/logout_act">
                                <i class="icon-key"></i> Log Out 
                            </a>
                        </li>
                    </ul>
                </li>
                <!-- END USER LOGIN DROPDOWN -->                
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->

<div class="clearfix"> </div>
