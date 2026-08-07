<template>
  <div class="min-vh-100 bg-light text-dark font-sans">
    
    <!-- 1. Navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-white px-4 py-3 shadow-sm">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center gap-2 fw-bold" href="#" style="color: #0B4F36;">
          <div class="d-flex align-items-center justify-content-center text-white rounded" style="width: 24px; height: 24px; background-color: #0B4F36; font-size: 12px;">V</div>
          VerdeControl
        </a>

        <!-- Enlaces centrales -->
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav gap-4 text-secondary">
            <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Testimonials</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
          </ul>
        </div>

        <div class="d-none d-md-block">
          <NuxtLink to="/login" class="btn text-white fw-medium" style="background-color: #0B4F36;">
            Get Started
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- 2. Hero Section -->
    <header class="container-fluid px-4 mt-3">
      <div class="position-relative rounded-4 overflow-hidden d-flex align-items-center justify-content-center bg-dark" style="height: 500px;">
        <!-- Fondo oscuro simulando la imagen -->
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3)); z-index: 1;"></div>
        
        <div class="position-relative text-center text-white px-3" style="z-index: 2; max-width: 700px;">
          <h1 class="display-5 fw-semibold mb-3">Precision Management for Living Assets</h1>
          <p class="lead mb-4 fw-light text-light" style="font-size: 1.1rem;">
            Optimize your urban green spaces and vertical gardens with smart tracking, 
            automated scheduling, and real-time maintenance tools.
          </p>
          <NuxtLink to="/register" class="btn text-white rounded-pill px-5 py-2 fw-semibold shadow" style="background-color: #F98E2B;">
            Start Free Trial
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 3. Features Section -->
    <section class="container py-5 mt-4 text-center">
      <h2 class="h6 text-secondary mb-2">Smarter Green Space Management</h2>
      <p class="text-muted mb-5 mx-auto" style="max-width: 600px;">
        Empower your facility management with data-driven insights and automated scheduling for all your living assets.
      </p>

      <div class="row g-4 text-start">
        <!-- Feature 1 -->
        <div class="col-md-4">
          <div class="p-4 rounded-4 border h-100" style="background-color: #f4f7fb; border-color: #e2e8f0;">
            <div class="d-flex align-items-center justify-content-center text-white rounded-circle mb-3" style="width: 40px; height: 40px; background-color: #0B4F36;">📍</div>
            <h3 class="h6 fw-semibold">Precision Management</h3>
            <p class="text-secondary small mb-0">
              Monitor plant health, soil conditions, and resource usage with pinpoint accuracy using our advanced sensor network integration.
            </p>
          </div>
        </div>
        <!-- Feature 2 -->
        <div class="col-md-4">
          <div class="p-4 rounded-4 border h-100" style="background-color: #f4f7fb; border-color: #e2e8f0;">
            <div class="d-flex align-items-center justify-content-center text-white rounded-circle mb-3" style="width: 40px; height: 40px; background-color: #0B4F36;">🗓️</div>
            <h3 class="h6 fw-semibold">Smart Scheduling</h3>
            <p class="text-secondary small mb-0">
              Automate watering, pruning, and fertilization schedules based on real-time environmental data and specific plant requirements.
            </p>
          </div>
        </div>
        <!-- Feature 3 -->
        <div class="col-md-4">
          <div class="p-4 rounded-4 border h-100" style="background-color: #f4f7fb; border-color: #e2e8f0;">
            <div class="d-flex align-items-center justify-content-center text-white rounded-circle mb-3" style="width: 40px; height: 40px; background-color: #0B4F36;">📊</div>
            <h3 class="h6 fw-semibold">Real-Time Tracking</h3>
            <p class="text-secondary small mb-0">
              Track the growth, coverage, and health metrics of your green spaces across multiple locations from a single unified dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Testimonials Section -->
    <section class="container py-5 text-center" style="max-width: 900px;">
      <h2 class="h6 text-secondary mb-5">What Facility Managers Say</h2>
      
      <div class="row g-4 text-start">
        <!-- Testimonial 1 -->
        <div class="col-md-6">
          <div class="p-4 rounded-4 position-relative h-100" style="background-color: #f4f7fb;">
            <span class="position-absolute top-0 end-0 mt-3 me-4 text-primary opacity-25" style="font-size: 4rem; line-height: 1; font-family: serif;">"</span>
            <p class="fst-italic text-secondary small mb-4 position-relative" style="z-index: 1;">
              "VerdeControl has completely transformed how we manage our corporate campus gardens. The real-time tracking is a game changer for our maintenance crew."
            </p>
            <div class="d-flex align-items-center position-relative" style="z-index: 1;">
              <div class="rounded-circle bg-secondary me-3" style="width: 40px; height: 40px;"></div>
              <div>
                <p class="mb-0 fw-semibold" style="font-size: 0.85rem;">Sarah Jenkins</p>
                <p class="mb-0 text-muted" style="font-size: 0.75rem;">Head Facility Manager, EcoCorp</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Testimonial 2 -->
        <div class="col-md-6">
          <div class="p-4 rounded-4 position-relative h-100" style="background-color: #f4f7fb;">
            <span class="position-absolute top-0 end-0 mt-3 me-4 text-primary opacity-25" style="font-size: 4rem; line-height: 1; font-family: serif;">"</span>
            <p class="fst-italic text-secondary small mb-4 position-relative" style="z-index: 1;">
              "The automated scheduling alone saves us dozens of hours of manual planning every week. It's an indispensable tool for modern urban operations."
            </p>
            <div class="d-flex align-items-center position-relative" style="z-index: 1;">
              <div class="rounded-circle bg-secondary me-3" style="width: 40px; height: 40px;"></div>
              <div>
                <p class="mb-0 fw-semibold" style="font-size: 0.85rem;">Mark Thompson</p>
                <p class="mb-0 text-muted" style="font-size: 0.75rem;">Operations Director, UrbanSpace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. CTA Box -->
    <section class="container py-5">
      <div class="rounded-4 p-5 d-flex flex-column flex-md-row justify-content-between align-items-center text-white" style="background-color: #0B4F36;">
        <div class="mb-4 mb-md-0" style="max-width: 500px;">
          <h2 class="h4 fw-semibold mb-2">Ready to optimize your living assets?</h2>
          <p class="small mb-0" style="color: #a3cfbd;">
            Join hundreds of facility managers using VerdeControl to streamline their green space maintenance.
          </p>
        </div>
        <div class="d-flex gap-3">
          <button class="btn btn-light rounded-pill px-4 py-2 fw-semibold text-dark">Contact Sales</button>
          <NuxtLink to="/login" class="btn text-white rounded-pill px-4 py-2 fw-semibold" style="background-color: #F98E2B;">Get Started</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 6. Footer -->
    <footer class="container border-top mt-5 py-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div class="text-secondary small mb-3 mb-md-0">
        <span class="fw-bold me-1">⚲</span> © 2024 VerdeControl. All rights reserved.
      </div>
      <div class="d-flex gap-4 small">
        <a href="#" class="text-decoration-none text-secondary">Privacy Policy</a>
        <a href="#" class="text-decoration-none text-secondary">Terms of Service</a>
      </div>
    </footer>

  </div>
</template>