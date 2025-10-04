#!/usr/bin/env python3
"""
Script para generar un CV en PDF con estilo profesional
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
import os

def create_cv():
    # Crear el documento PDF
    doc = SimpleDocTemplate("Joseph_Santur_CV.pdf", pagesize=A4, topMargin=1*inch, bottomMargin=1*inch)
    
    # Estilos personalizados
    styles = getSampleStyleSheet()
    
    # Estilo para el nombre principal
    name_style = ParagraphStyle(
        'CustomName',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para el título
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#64748b'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    
    # Estilo para secciones
    section_style = ParagraphStyle(
        'CustomSection',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#059669'),
        spaceAfter=12,
        spaceBefore=16,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para contenido
    content_style = ParagraphStyle(
        'CustomContent',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.HexColor('#374151'),
        spaceAfter=8,
        fontName='Helvetica'
    )
    
    # Estilo para información de contacto
    contact_style = ParagraphStyle(
        'CustomContact',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#64748b'),
        alignment=TA_CENTER,
        spaceAfter=4,
        fontName='Helvetica'
    )
    
    # Contenido del CV
    story = []
    
    # Información personal
    story.append(Paragraph("Joseph Santur Mogollón", name_style))
    story.append(Paragraph("Full Stack Developer", title_style))
    
    # Información de contacto
    contact_info = [
        "joseph.santur@example.com | +34 600 000 000",
        "linkedin.com/in/josephsantur | github.com/jsantur",
        "Galicia, España"
    ]
    
    for info in contact_info:
        story.append(Paragraph(info, contact_style))
    
    story.append(Spacer(1, 20))
    
    # Línea divisoria
    story.append(HRFlowable(width="100%", thickness=1, lineCap='round', color=colors.HexColor('#e5e7eb')))
    story.append(Spacer(1, 20))
    
    # Resumen profesional
    story.append(Paragraph("Resumen Profesional", section_style))
    summary_text = """
    Desarrollador Full Stack apasionado con más de 2 años de experiencia en la creación de soluciones 
    web y móviles escalables. Especializado en JavaScript, React.js, Node.js y Python. 
    Experiencia en arquitectura de software, consultoría y desarrollo de aplicaciones empresariales.
    """
    story.append(Paragraph(summary_text, content_style))
    story.append(Spacer(1, 12))
    
    # Experiencia laboral
    story.append(Paragraph("Experiencia Profesional", section_style))
    
    # Experiencia 1
    exp1_text = """
    <b>Senior Full Stack Developer</b> | Tech Solutions Inc. | 2023 - Presente<br/>
    • Lideré el desarrollo de aplicaciones web empresariales con React.js y Node.js<br/>
    • Diseñé arquitecturas escalables y optimicé rendimiento de aplicaciones<br/>
    • Implementé soluciones cloud con AWS y Docker<br/>
    • Trabajé con equipos ágiles usando Scrum y metodologías DevOps
    """
    story.append(Paragraph(exp1_text, content_style))
    story.append(Spacer(1, 8))
    
    # Experiencia 2
    exp2_text = """
    <b>Full Stack Developer</b> | Digital Innovations | 2022 - 2023<br/>
    • Desarrollé aplicaciones móviles con React Native<br/>
    • Implementé servicios backend con Express.js y microservicios<br/>
    • Migré sistemas monolíticos a arquitecturas modernas<br/>
    • Integré sistemas de pago y servicios de terceros
    """
    story.append(Paragraph(exp2_text, content_style))
    story.append(Spacer(1, 8))
    
    # Experiencia 3
    exp3_text = """
    <b>Junior Software Developer</b> | StartUp Valley | 2021 - 2022<br/>
    • Contribuí al desarrollo de aplicaciones web con JavaScript y Python<br/>
    • Participé en code reviews y mejora continua<br/>
    • Implementé nuevas funcionalidades y resolví bugs<br/>
    • Trabajé con bases de datos SQL y NoSQL
    """
    story.append(Paragraph(exp3_text, content_style))
    story.append(Spacer(1, 12))
    
    # Educación
    story.append(Paragraph("Educación", section_style))
    edu_text = """
    <b>M.Sc. Masters Degree</b> | Ingeniería de Software | Universidad Tecnológica<br/>
    <b>B.Sc. Bachelors Degree</b> | Ciencias de la Computación | Universidad Nacional<br/>
    <b>Certificaciones:</b> AWS Certified Developer, Google Cloud Professional, React Advanced
    """
    story.append(Paragraph(edu_text, content_style))
    story.append(Spacer(1, 12))
    
    # Habilidades técnicas
    story.append(Paragraph("Habilidades Técnicas", section_style))
    
    # Crear tabla de habilidades
    skills_data = [
        ['Frontend:', 'HTML/CSS (95%), JavaScript (90%), React.js (85%), TypeScript (75%)'],
        ['Backend:', 'Node.js (88%), Python (92%), Express.js (85%), PostgreSQL (80%)'],
        ['Tools:', 'Git (90%), Docker (75%), AWS (70%), React Native (82%)'],
        ['Otros:', 'Linux, CI/CD, Agile/Scrum, REST APIs, GraphQL']
    ]
    
    skills_table = Table(skills_data, colWidths=[1.5*inch, 5*inch])
    skills_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#059669')),
        ('TEXTCOLOR', (1, 0), (1, -1), colors.HexColor('#374151')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    story.append(skills_table)
    story.append(Spacer(1, 12))
    
    # Proyectos destacados
    story.append(Paragraph("Proyectos Destacados", section_style))
    
    projects_text = """
    <b>E-Commerce Platform</b> | React.js, Node.js, MongoDB, Stripe<br/>
    Plataforma completa de comercio electrónico con panel de administración y pasarela de pagos.<br/><br/>
    
    <b>Task Management App</b> | React Native, Firebase, Redux<br/>
    Aplicación móvil para gestión de proyectos con sincronización en tiempo real.<br/><br/>
    
    <b>Analytics Dashboard</b> | Vue.js, Python, FastAPI, PostgreSQL<br/>
    Dashboard empresarial para análisis de datos con visualizaciones interactivas.
    """
    
    story.append(Paragraph(projects_text, content_style))
    story.append(Spacer(1, 12))
    
    # Información adicional
    story.append(Paragraph("Información Adicional", section_style))
    additional_text = """
    <b>Idiomas:</b> Español (nativo), Inglés (avanzado), Gallego (nativo)<br/>
    <b>Disponibilidad:</b> Inmediata | <b>Ubicación:</b> Galicia, España (remoto/presencial)<br/>
    <b>Intereses:</b> Tecnología, desarrollo de software, inteligencia artificial, deporte
    """
    
    story.append(Paragraph(additional_text, content_style))
    
    # Construir el PDF
    doc.build(story)
    print("✅ CV generado exitosamente: Joseph_Santur_CV.pdf")

if __name__ == "__main__":
    create_cv()